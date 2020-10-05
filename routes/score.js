const express = require('express')
const router = express.Router()
const Score = require('../models/Score')
const fuzzysort = require('fuzzysort')
const multer = require('multer')
const path = require('path')

// Common variables.
const numberOfScores = 5

// Multer storage function.
var storage = multer.diskStorage({
  destination: './static/unverified/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.mxl')
  }
})

var upload = multer({ storage: storage })

// Post info about a Score to the database.
router.post('/', async (request, response) => {
  try {
    // Create a new Score.
    const score = new Score({
      title: request.body.title,
      filename: request.body.filename,
      composer: request.body.composer,
      songType: request.body.songType,
      songKey: request.body.songKey,
      location: request.body.location,
      region: request.body.region,
      country: request.body.country,
      collections: request.body.collections,
      tags: request.body.tags,
    })

	console.log(score)

    // Try to save the Score to the Database.
    const savedScore = await score.save()
    response.json(savedScore)
  } catch (error) {
	console.log(error)
    response.json({ message: error })
  }
})

// Upload a Score to the server.
router.post('/file', upload.single('score'), function (request, response, next) {
  try {
    if (!request.file) {
      // Send failed response.
      response.send({
            status: false,
            message: 'No file uploaded'
        })
    } else {
        // Send successful response.
        response.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: request.file.originalname,
                filename: request.file.filename,
            }
        })
    }
  } catch (err) {
    // Send error response.
    response.status(500).send(err)
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
  console.log("Trying to add Score.");

  try {
    let score = await Score.findOne({ id: request.params.id })

    score.title = request.body.title,
    score.filename = request.body.filename,
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

/**
 * Implement different getters for Scores in the future.
 * For now it will suffice with returning the whole score registry.
 */

 // Get X amount of Random Scores. Amount should be sent from client.
 router.get('/random', async (request, response) => {
   const databaseScoreCount = await Score.countDocuments()

   var scoreArray = []

   for (let i = 0; i < numberOfScores; i++) {
    // Random value from score count.
    random = Math.floor(Math.random() * databaseScoreCount)

    // Push score by random skip.
    scoreArray.push(Score.findOne().skip(random))
   }
 })

/* router.get('/random', async (request, response) => {
  var numberOfScores = request.body.amount
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
}) */

// Get X amount of most recent scores. Amount should be sent from client.
router.get('/recent', async (request, response) => {
  try {
    Score.find().sort({ dateWhenAdded: -1 }).limit(numberOfScores)
  } catch (error) {
    response.json({ message: error })
  }
})

router.get('/popular', async (request, response) => {
  try {
    Score.find().sort({ likes: -1 }).limit(numberOfScores)
  } catch (error) {
    response.json({ message: error })
  }
})

module.exports = router
