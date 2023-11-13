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

  // get session id for 2nd user
  socket.on("join-session", async (sessionId) => {
    const session = await findSession(sessionId)
    socket.join(sessionId)
    console.log('user joins')

    socket.on('leave-session', async (data) => {
      console.log('user leave')
      console.log(data)
      const updatedSession = await Session.findByIdAndUpdate(sessionId, { ...data }, { new : true})
      console.log(updatedSession)
      socket.broadcast.to(sessionId).emit('notify', `${data.username} just left the session!`)
    })
  }) 

  // coding session
  socket.on("get-session", async sessionId => {
    const session = await findSession(sessionId)
    socket.join(sessionId)
    const sessionData = {
      data : session.data,
      language : session.language
    }
    socket.emit("load-session", sessionData)
    
    console.log("socket join")

    // langauge change
    socket.on("send_language", delta => {
      console.log("send_language received")
      socket.broadcast.to(sessionId).emit("received_language", delta)
    })

    // code changes
    socket.on("send_changes", delta => {
      socket.broadcast.to(sessionId).emit("received_changes", delta) //broadcast.to(sessionId)
    })

    socket.on("save-document", async saveData => {
      await Session.findByIdAndUpdate(sessionId, saveData)
    })

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
    
  })

  // chat messages
  socket.on("join-chat", async (sessionId) => {
    console.log('join chat')
    const session = await findSession(sessionId)
    socket.join(sessionId)
    socket.emit("load-chat", session.chat)

    socket.on("send-chat", async (msg) => {
      console.log("received", msg)
      socket.broadcast.to(sessionId).emit("receive-chat", msg)
      console.log('saving changes to database')
      await Session.findByIdAndUpdate(sessionId, { $push : { chat : msg}})
    })

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`)
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

const rabbitmq_url = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'
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
