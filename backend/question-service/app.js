const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questions');

//express app
const app = express();

app.use(cors());

// middleware for logging purposes, runs on every req
app.use(express.json());

app.use('/api/questions', questionRoutes);

module.exports = app;
