const express = require('express')
const router = express.Router()
const Score = require('../models/Score')
const fuzzysort = require('fuzzysort')

// Post a new Score.
router.post('/', async (request, response) => {
  try {
    // Create a new Score.
    const score = new Score({
      title: request.body.title,
      composer: request.body.composer,
      songType: request.body.songType,
      songKey: request.body.songKey,
      location: request.body.location,
      region: request.body.region,
      country: request.body.country,
      collections: request.body.collections,
      tags: request.body.tags,
    })

    // Try to save the Score to the Database.
    const savedScore = await score.save()
    response.json(savedScore)
  } catch (error) {
    response.json({ message: error })
  }
})

// Remove Score by ID.
router.delete('/delete/:id', async (request, response) => {
  try {
    const score = await Score.deleteOne({ id: request.params.id })
    response.json(score)
  } catch (error) {
    response.json({ message: error })
  }
})

// Update Score by ID.
router.put('/update/:id', async (request, response) => {
  try {
    let score = await Score.findOne({ id: request.params.id })

    score.title = request.body.title,
    score.composer = request.body.composer,
    score.songType = request.body.songType,
    score.songKey = request.body.songKey,
    score.location = request.body.location,
    score.region = request.body.region,
    score.country = request.body.country,
    score.collections = request.body.collections,
    score.tags = request.body.tags,
  
    await score.save()
  } catch (error) {
    response.json({ message: error })
  }
})

// Return all Scores.
router.get('/', async (request, response) => {
  try {
    const scores = await Score.find()
    response.json(scores)
  } catch (error) {
    response.json({ message: error })
  }
})

router.get

/**
 * Implement different getters for Scores in the future.
 * For now it will suffice with returning the whole score registry.
 */

// Get X amount of Random Scores.
router.get('/random', async (request, response) => {
  var numberOfScores = 20
  var random = []
  var scores = []
  
  try {
    // Place all scores in an array.
    const allScores = await Score.find()

    // All all score ID's to the array.
    for (let i = 0; i < allScores.length; i++) {
      random[i] = allScores[i]._id
    }

    // Use randomization algorithm.
    var currentIndex = random.length
    var temporaryValue
    var randomIndex

    // Algorithm randomizes the order of ID's in the array.
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = random[currentIndex]
      random[currentIndex] = random[randomIndex]
      random[randomIndex] = temporaryValue
    }

    // Places X amount of Scores from the start of the list to be returned.
    for (let i = 0; i < numberOfScores; i++) {
      const score = await Score.findOne({ _id: random[i] })
      scores[i] = score
    }

    // Respond with the Score array.
    response.json(scores)
    } catch (error) {
    response.json({ message: error })
  }
})

// Get X amount of most recent scores.
router.get('/recent', async (request, response) => {
  var numberOfScores = 20

  try {
    Score.find().sort({ dateWhenAdded: -1 }).limit(numberOfScores)
  } catch (error) {
    response.json({ message: error })
  }
})

module.exports = router