const express = require('express')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 3001;

//express app
const app = express()

// middleware for logging purposes, runs on every req
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to the app'})
})

//listen for requests
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})