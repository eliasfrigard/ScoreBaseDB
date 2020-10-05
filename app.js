require('dotenv/config')

// Dependencies.
const express = require('express')
const application = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const health = require('express-ping');

application.use(cors())
application.use(bodyparser.json())
application.use(health.ping())

let options = {
  dotfiles: "ignore",
  indes: false,
  redirect: false,
}

// Serve static assets.
application.use(express.static('static', options))
application.use(express.static('static/mxl', options))
application.use(express.static('static/unverified', options))

/* application.use(express.static(path.join(__dirname, 'static/mxl')))
application.use(express.static(path.join(__dirname, 'static/midi')))
application.use(express.static(path.join(__dirname, 'static/unverified'))) */

// Import routes.
const scoreRoute = require('./routes/score')
const emailRoute = require('./routes/email')
const uploadRoute = require('./routes/upload')

// Use routes for traffic.
application.use('/score', scoreRoute)
application.use('/email', emailRoute)
application.use('/upload', uploadRoute)

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('Connected to Database!'),
)

// Listeing to port:
application.listen(8080)