require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const rabbitMQHandler = require('./connection');
const matchingRoutes = require('./routes/matching');

const PORT = process.env.PORT || 3004;

//express app
const app = express();
const server = require('http').createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // react local host
    methods: ['POST'],
  },
});

app.use(cors());

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/matching', matchingRoutes);

rabbitMQHandler((connection) => {
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    const queue = 'matching';

    channel.assertQueue(queue, {
      durable: false,
    });

    let requestBuffer = [];

    channel.consume(
      queue,
      (msg) => {
        console.log(' [x] Received %s', msg.content.toString());
        const request = JSON.parse(msg.content.toString());
        const socketId = request.socketId;
        const uid = request.uid;
        const complexity = request.complexity;
        for (let i = 0; i < requestBuffer.length; i++) {
          const bufferedRequest = requestBuffer[i];
          if (
            bufferedRequest.complexity == complexity &&
            bufferedRequest.uid != uid
          ) {
            const matchPair = [bufferedRequest, request];
            io.to(socketId).emit('matching', matchPair);
            io.to(bufferedRequest.socketId).emit('matching', matchPair);
            requestBuffer.slice(i, i); // Remove matched request from buffer
            return;
          }
        }
        requestBuffer.push(request);
      },
      { noAck: true }
    );
  });
});

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
