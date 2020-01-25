const express = require('express')
const router = express.Router()
const Score = require('../models/Score')

// Get back all scores.
router.get('/', async (request, response) => {
  try {
    const score = await Score.find()
    response.json(score)
  } catch (error) {
    response.json({ message: error })
  }
})

// Submit a score.
router.post('/', async (request, response) => {
  const score = new Score({
    title: request.body.title,
    composer: request.body.composer,
    origin: request.body.origin,
    path: request.body.path,
    audio: request.body.audio,
  })

  try {
    const savedScore = await score.save()
    response.json(savedScore)
    console.log('New score added.' + '\n'
    + 'Title: ' + savedScore.title + '\n'
    + 'Composer: '+ savedScore.composer + '\n'
    + 'Origin: '+ savedScore.origin + '\n'
    )
  } catch (error) {
    response.json({ message: error })
  }
})

// Get specific score.
router.get('/:postID', (request, response) => {
  try {
    const post = Score.findById(request.params.postID)
    response.json(post)
  } catch (error) {
    response.json({ message: error })
  }
})

module.exports = router