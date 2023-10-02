require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io')

const mongoose = require("mongoose")
const Document = require("./Document")

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

  // socket.on("send_message", (data) => {
  //   console.log(data)

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

  socket.on("get-session", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-session", document.data)

    socket.on("send_changes", delta => {
      console.log(delta)
      socket.broadcast.to(documentId).emit("received_changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})


async function findOrCreateDocument(id) {
  if (id == null) return
  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}