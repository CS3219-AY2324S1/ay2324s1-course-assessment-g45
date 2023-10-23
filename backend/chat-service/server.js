require('dotenv').config();

const express = require('express')
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io')

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3005;

const app = express()
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const server = createServer(app); // create server

server.listen(PORT, () => {
  console.log('listening on port', PORT);
})


const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // react local host
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("user connected", socket.id)

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
  })
})


