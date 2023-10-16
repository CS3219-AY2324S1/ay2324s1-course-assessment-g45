require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userProfileRoutes = require('./routes/userProfiles');

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
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});



module.exports = { pool }