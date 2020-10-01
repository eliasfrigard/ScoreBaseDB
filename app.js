require('dotenv/config')

// Dependencies.
const express = require('express')
const application = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

application.use(cors())
application.use(bodyparser.json())
application.use(express.static(path.join(__dirname, './static')))

// Import routes.
const scoreRoute = require('./routes/score')
const emailRoute = require('./routes/email')

// Use routes for traffic.
application.use('/score', scoreRoute)
application.use('/email', emailRoute)

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('Connected to Database!')
)

// Listeing to port:
application.listen(3000)