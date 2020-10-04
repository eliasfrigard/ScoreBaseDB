const express = require('express')
const router = express.Router()

// Serving upload page, move later.
router.get('/', async (req, res) => {
  res.sendFile(__dirname + '/views/upload/index.html')
})

router.get('/style', async (req, res) => {
  res.sendFile(__dirname + '/views/upload/style.css')
})

router.get('/js', async (req, res) => {
  res.sendFile(__dirname + '/views/upload/upload.js')
})

module.exports = router