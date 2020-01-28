const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()

// Get specific score.
router.post('/', (request, response) => {
  try {
    console.log(request.body)

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: 'frigard.elias@gmail.com',
          pass: 'Esplanaden12d'
      }
  });

    var mailOptions = {
      from: 'elias_frigard@hotmail.com',
      to: 'elias_frigard@hotmail.com',
      subject: 'ScoreBase Email',
      text: 'Mail from: ' + request.body.name + '\n' + request.body.email + '\n\n' + request.body.message
    }

    transporter.sendMail(mailOptions)

  } catch (error) {
    response.json({ message: error })
  }
})

module.exports = router