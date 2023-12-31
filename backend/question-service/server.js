require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questions');
const amqp = require('amqplib/callback_api')

const Question = require('./models/questionModel');

const PORT = process.env.PORT || 3002;

//express app
const app = express();

app.use(cors());

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/questions', questionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const rabbitmq_url = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'
amqp.connect(rabbitmq_url, (err, connection) => {
  if (err) {
    throw err
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err
    }


    let queueName = "question"
    channel.assertQueue(queueName, {
      durable: false
    })
    channel.prefetch(1)
    console.log(' [x] Awaiting question requests')

    channel.consume(queueName, async (msg) => {
      const complexity = JSON.parse(msg.content.toString()).complexity
      console.log(`[x] Received request for question of ${complexity} complexity`)
      // const question = await Question.findOne({ complexity: complexity})
      const question = await findRandomQuestion(complexity)
      if (question) {
        channel.sendToQueue(msg.properties.replyTo, 
          Buffer.from(question.id),
          { correlationId: 'matching_service'}  
        )
        console.log(`[x] Sent questions to queue`)
        channel.ack(msg)
      }
      // handle error if no question found
    })
  })
})

const findRandomQuestion = async(complexity) => {
  const count = await Question.countDocuments({ complexity: complexity}).count().exec()
  var random = Math.floor(Math.random() * count)
  const question = await Question.findOne({ complexity: complexity }).skip(random)
  return question
}
