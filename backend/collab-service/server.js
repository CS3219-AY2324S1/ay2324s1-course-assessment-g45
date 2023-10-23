require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io')

const mongoose = require("mongoose")
const Document = require("./Document")

// api calls
const collabSessionRoutes = require('./routes/collabSession')

const Session = require('./models/sessionModel')

const amqp = require('amqplib/callback_api')

const PORT = process.env.PORT || 3003;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());

app.use(express.json());


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/collabSession', collabSessionRoutes)

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // react local host
    methods: ["GET", "POST"]
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const defaultValue = ""

io.on("connection", (socket) => {
   console.log("user connected", socket.id)

  //   // broadcast to everyone
  //   // socket.broadcast.emit("receive_message", data)

  //   // broatcast to only people in the room
  //   socket.to(data.roomNumber).emit("receive_message", data)
  // })

  // socket.on("join_room", (data) => {
  //   console.log(data)

  //   // join room with the room number in data
  //   socket.join(data.roomNumber)
  // })
  // socket.on('get-session', (id) => {
  //   const data = "data given!"
  //   console.log("Get session")
  //   socket.join(id) // join the session with the given id
  //   socket.emit('load-session', data)
  // })

  // socket.on("get-session", async documentId => {
  //   const document = await findOrCreateDocument(documentId)
  //   socket.join(documentId)
  //   socket.emit("load-session", document.data)

  //   console.log("socket join")
  //   socket.on("send_changes", delta => {
  //     socket.broadcast.to(documentId).emit("received_changes", delta) //broadcast.to(documentId)
  //   })

  //   socket.on("save-document", async data => {
  //     await Document.findByIdAndUpdate(documentId, { data })
  //   })
  // })

  socket.on("get-session", async sessionId => {
    const session = await findSession(sessionId)
    socket.join(sessionId)
    socket.emit("load-session", session.data)
    
    console.log("socket join")
    socket.on("send_changes", delta => {
      socket.broadcast.to(sessionId).emit("received_changes", delta) //broadcast.to(sessionId)
    })

    socket.on("save-document", async data => {
      await Session.findByIdAndUpdate(sessionId, { data })
    })
  })
})

async function findSession(id) {
  if (id == null) return
  const session = await Session.findById(id)
  if (session) return session
  return null
  // return await Document.create({ _id: id, data: defaultValue })
}

async function findOrCreateDocument(id) {
  if (id == null) return
  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}

const rabbitmq_url = process.env.RABBITMQ_URL ?? 'amqp://localhost:5673'
amqp.connect(rabbitmq_url, (err, connection) => {
  if (err) {
    throw err
  }

  connection.createChannel((err, channel) => {
    if (err) {
      throw err
    }

    let queueName = 'collabSession'

    channel.assertQueue(queueName, {
      durable: true
    })

    channel.prefetch(1)
    console.log(' [x] Awaiting create session requests')

    channel.consume(queueName, async (msg) => {
      const data = JSON.parse(msg.content)
      console.log(`[x] Received session: ${data}`)
      channel.ack(msg)
      try {
        console.log(data)
        const session = await Session.create(data)
        console.log(session)

        // if session created, send to queue for matching service
        if (session) {
          channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(JSON.stringify(session))  
          )
          console.log(`[x] Sent session created to queue`)
        }
      } catch (err) {
        // handle unable to create
        console.log(err)
      }
    })
  })
})
