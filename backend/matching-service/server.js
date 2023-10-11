require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const rabbitMQHandler = require('./connection');
const matchingRoutes = require('./routes/matching');
const { v4: uuidv4 } = require('uuid');

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
    const matchingQueue = 'matching';
    const questionQueue = 'question'

    channel.assertQueue(matchingQueue, {
      durable: false,
    });

    channel.assertQueue(questionQueue, {
      durable: false
    })

    let requestBuffer = [];

    channel.consume(
      matchingQueue,
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

            // send to question queue to request for qns
            // channel.sendToQueue(questionQueue, Buffer.from(JSON.stringify({ complexity : complexity})))
            // console.log(`Sent to queue: ${complexity}`)

            channel.assertQueue('', {
              exclusive: true,
            }, (err, queue) => {
              if (err) {
                throw err
              }

              // send to request for question
              channel.sendToQueue('question', 
                Buffer.from(JSON.stringify({ complexity : complexity})),
                { 
                  correlationId : 'matching_service' , 
                  replyTo: queue.queue, 
                }
              )
              console.log('sent request to queue!')

              // read from queue to get the requested question
              channel.consume(queue.queue, (msg) => {
                if (msg.properties.correlationId == 'matching_service') {
                  console.log(`Got message: ${msg.content.toString()}`)
                  const question_id = msg.content.toString()
                  const session_id = uuidv4()
                  const collab_session = { question_id, session_id }
  
                  console.log(question_id)
                  io.to(socketId).emit('matching', collab_session);
                  io.to(bufferedRequest.socketId).emit('matching', collab_session);
                  requestBuffer.slice(i, i); // Remove matched request from buffer
                }
              })
            })


            // io.to(socketId).emit('matching', matchPair);
            // io.to(bufferedRequest.socketId).emit('matching', matchPair);
            // requestBuffer.slice(i, i); // Remove matched request from buffer
            return;
          }
        }
        requestBuffer.push(request);
      },
      { noAck: true }
    );

    // Delete requests from buffer 30 seconds after the request and notify deleted requests
    setInterval(() => {
      var time = Date.now();
      const newBuffer = requestBuffer.filter((request) => {
        return time < request.time + 30 * 1000;
      });
      const deletedRequests = requestBuffer.filter(
        (request) => !newBuffer.includes(request)
      );
      for (let i = 0; i < deletedRequests.length; i++) {
        io.to(deletedRequests[i].socketId).emit('timeout', 'Request timed out');
      }
      requestBuffer = newBuffer;
    }, 500);
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
