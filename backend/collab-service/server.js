require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io')

const PORT = process.env.PORT || 3003;

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors : {
    origin: "http://localhost:3000", // react local host
    methods: ["GET", "POST"]
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
  // console.log("user connected", socket.id)

  socket.on("send_message", (data) => {
    console.log(data)

    // broadcast to everyone
    // socket.broadcast.emit("receive_message", data)

    // broatcast to only people in the room
    socket.to(data.roomNumber).emit("receive_message", data)
  })

  socket.on("join_room", (data) => {
    console.log(data)

    // join room with the room number in data
    socket.join(data.roomNumber)
  })

  socket.on("send_changes", delta => {
    console.log(delta)
    socket.broadcast.emit("received_changes", delta)
  })
})