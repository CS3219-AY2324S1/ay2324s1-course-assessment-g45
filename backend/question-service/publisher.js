const ampq = require('amqplib/callback_api')

ampq.connect(`ampq://localhost`, (err, connection) => {
  if (err) {
    throw err
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err
    }

    let queueName = "question"
    let message = "this is a message"
    channel.assertQueue(queueName, {
      durable: false
    })
    channel.sendToQueue(queueName, Buffer.from(message))
    setTimeout(() => connection.close(), 1000)
  })
})