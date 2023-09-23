require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const questionRoutes = require('./routes/questions');

const PORT = process.env.PORT || 3001;

//express app
const app = express();

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.static(path.resolve('../frontend')));

app.get('/', (req, res) => {
  const filePath = path.resolve('../frontend/index.html');
  console.log(filePath);
  res.sendFile(filePath);
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
