require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userProfileRoutes = require('./routes/userProfiles');
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

app.use('/api/userProfiles', userProfileRoutes);
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
