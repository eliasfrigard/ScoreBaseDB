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

application.post('/upload-avatar', async (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
          let avatar = req.files.avatar;
          
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          avatar.mv('./static/' + avatar.name);

          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: avatar.name,
                  mimetype: avatar.mimetype,
                  size: avatar.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});