require('dotenv/config')

const express = require('express')
const application = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

application.use(cors())
application.use(bodyparser.json())

// Import routes.
// const collectionRoute = require('./routes/collection')
const scoreRoute = require('./routes/score')
// const userRoute = require('./routes/user.js')

// application.use('/collection', collectionRoute)
application.use('/score', scoreRoute)
// application.use('/user', userRoute)


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('Connected to Database!')
)

// Listeing to port:
application.listen(27017)