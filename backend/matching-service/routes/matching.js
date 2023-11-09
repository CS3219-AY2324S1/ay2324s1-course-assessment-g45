const express = require('express');
const rabbitMQHandler = require('../connection');
const router = express.Router();

const receiveRequest = async (req, res) => {
  rabbitMQHandler((connection) => {
    connection.createChannel((error, channel) => {
      if (error) {
        return res.status(400).json({ error });
      }
      const queue = 'matching';

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
      console.log(' [x] Sent %s', JSON.stringify(req.body));

      channel.close(() => {
        connection.close();
      });

      res.status(200).json({ message: 'Matching request queued' });
    });
  });
};

const cancelRequest = async (req, res) => {
  rabbitMQHandler((connection) => {
    connection.createChannel((error, channel) => {
      if (error) {
        return res.status(400).json({ error });
      }
      const queue = 'cancelMatch';

      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
      console.log(' [x] Sent %s', JSON.stringify(req.body));

      channel.close(() => {
        connection.close();
      });

      res.status(200).json({ message: 'Cancel match request queued' });
    });
  });
};

// POST a matching request
router.post('/', receiveRequest);

// POST a cancel match request
router.post('/cancel', cancelRequest);

module.exports = router;
