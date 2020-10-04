require('dotenv/config')

// Dependencies.
const express = require('express')
const application = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
// const multer = require('multer')

application.use(cors())
application.use(bodyparser.json())
//application.use(multer({dest:'./static/mxl/'}))

// Serve static assets.
application.use(express.static(path.join(__dirname, 'static/mxl')))
application.use(express.static(path.join(__dirname, 'static/midi')))

// Serving upload page, move later.
application.get('/upload', async (req, res) => {
  res.sendFile(__dirname + '/views/uploading/index.html')
})

application.get('/uploadStyle', async (req, res) => {
  res.sendFile(__dirname + '/views/uploading/style.css')
})

application.get('/uploadJS', async (req, res) => {
  res.sendFile(__dirname + '/views/uploading/upload.js')
})

// Import routes.
const scoreRoute = require('./routes/score')
const emailRoute = require('./routes/email')
//const uploadRoute = require('./routes/uploading')

// Use routes for traffic.
application.use('/score', scoreRoute)
application.use('/email', emailRoute)
//application.use('/uploading', uploadRoute)

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('Connected to Database!'),
)

// Listeing to port:
application.listen(8080)