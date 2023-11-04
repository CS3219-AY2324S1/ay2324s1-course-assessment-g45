require('dotenv').config();
const uuid = require('uuid')
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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

rabbitMQHandler((connection) => {
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }
    const matchingQueue = 'matching';
    const questionQueue = 'question'
    const sessionQueue = 'collabSession';
    const replyQueue = 'reply_queue'

    channel.assertQueue(matchingQueue, {
      durable: false,
    });

    channel.assertQueue(questionQueue, {
      durable: false
    })

    // not sure about this durable thing
    channel.assertQueue(sessionQueue, {
      durable: true
    })
    channel.assertQueue(replyQueue, {
      durable: false
    })

    let requestBuffer = [];

    channel.consume(
      matchingQueue,
      (msg) => {
        console.log(' [x] Received %s from frontend', msg.content.toString());
        const request = JSON.parse(msg.content.toString());
        let isMatched = false;
        const socketId = request.socketId;
        const uid = request.uid;
        const complexity = request.complexity;
        for (let i = 0; i < requestBuffer.length; i++) {
          const bufferedRequest = requestBuffer[i];
          console.log('Looking through all present requests in the queue')
          console.log(request, bufferedRequest)
          if (
            bufferedRequest.complexity == complexity &&
            uid !== null && bufferedRequest.uid !== null &&
            bufferedRequest.uid != uid
          ) {
            console.log('Match found!')
            isMatched = true;
            const matchPair = [bufferedRequest, request];

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
              console.log('sent question request to queue!')

              // read from queue to get the requested question
              channel.consume(queue.queue, (msg) => {
                if (msg.properties.correlationId == 'matching_service') {
                  console.log(`Received question: ${msg.content.toString()} from question queue`)
                  const questionId = msg.content.toString()
                  // create a session id
                  const sessionId = new mongoose.Types.ObjectId();
                  const sessionInfo = {
                    _id: sessionId,
                    questionId: questionId,
                    user1: {
                      uid: request.uid,
                      username: request.username,
                    },
                    user2: {
                      uid: bufferedRequest.uid,
                      username: bufferedRequest.username,
                    },
                    data: '',
                    chat: new Array(),
                  }
                  console.log(sessionInfo)
                  console.log("Socket id for u1: " + socketId)
                  console.log("Socket id for u2: " + bufferedRequest.socketId)
                  channel.ack(msg) // accept message

                  // send session Info to frontend
                  io.to(socketId).emit('matching', sessionInfo);
                  io.to(bufferedRequest.socketId).emit('matching', sessionInfo);
                  requestBuffer.splice(i, 1); // Remove matched request from buffer
                }
              })
            })
            return;
          }
        }
        if (!isMatched) {
          requestBuffer.push(request);
        }
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
