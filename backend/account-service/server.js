const mysql = require('mysql2/promise');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
//const userProfileRoutes = require('./routes/userProfiles');
const userProfileRoutes = require('./routes/userSqlRoute');

const PORT = process.env.PORT || 3001;

//express app
const app = express();

app.use(cors());

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/userProfiles', userProfileRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log('listening on port', PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});