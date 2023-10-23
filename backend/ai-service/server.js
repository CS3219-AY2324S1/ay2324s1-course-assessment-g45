require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatgptRoutes = require('./routes/chatgpt');

const PORT = process.env.PORT || 3006;

//express app
const app = express();

app.use(cors());

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/chatgpt', chatgptRoutes);

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
