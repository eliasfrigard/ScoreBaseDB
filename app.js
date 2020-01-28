require('dotenv/config')

const express = require('express')
const application = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')

application.use(cors())
application.use(bodyparser.json())
application.use(express.static(path.join(__dirname, '../ScoreBase/src')))

// Import routes.
// const collectionRoute = require('./routes/collection')
const scoreRoute = require('./routes/score')
const emailRoute = require('./routes/email')
// const userRoute = require('./routes/user.js')

// application.use('/collection', collectionRoute)
application.use('/score', scoreRoute)
application.use('/email', emailRoute)
// application.use('/user', userRoute)

// Get specific score.
application.get('/', (request, response) => {
  try {
    response.json('../ScoreBase/src/index.html')
  } catch (error) {
    response.json({ message: error })
  }
})

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log('Connected to Database!')
)


// Listeing to port:
application.listen(3000)