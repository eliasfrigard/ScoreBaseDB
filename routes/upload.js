const express = require('express')
const router = express.Router()

// Serving upload page, move later.
router.get('/', async (req, res) => {
  res.sendFile('/home/ScoreBaseDB/views/upload/index.html')
})

router.get('/style', async (req, res) => {
  res.sendFile('/home/ScoreBaseDB/views/upload/style.css')
})

router.get('/js', async (req, res) => {
  res.sendFile('/home/ScoreBaseDB/views/upload/upload.js')
})

module.exports = router