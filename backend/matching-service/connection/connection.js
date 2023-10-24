const amqp = require('amqplib/callback_api');
const rabbitmq_url = process.env.RABBITMQ_URL ?? 'amqp://localhost:5673'
module.exports = (callback) => {
  amqp.connect(rabbitmq_url, (error, conection) => {
    if (error) {
      throw new Error(error);
    }

    callback(conection);
  });
};
            