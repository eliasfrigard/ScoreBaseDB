const express = require('express')
const router = express.Router()
const Score = require('../models/Score')
const fuzzysort = require('fuzzysort')

// Submit a score.
router.post('/', async (request, response) => {
  const score = new Score({
    title: request.body.title,
    composer: request.body.composer,
    origin: request.body.origin,
    path: request.body.path,
    audio: request.body.audio,
    index: await Score.count() + 1
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

// Get back all scores.
router.get('/', async (request, response) => {
  try {
    const score = await Score.find()
    response.json(score)
  } catch (error) {
    response.json({ message: error })
  }
})

// Get random score.
router.get('/random', async (request, response) => {
  try {
    var numberOfScores = 4
    var scoreCount = await Score.count()
    var random = []
    var scores = []

    for (let i = 0; i < scoreCount; i++) {
      random[i] = i
    }

    var currentIndex = random.length
    var temporaryValue
    var randomIndex

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = random[currentIndex]
      random[currentIndex] = random[randomIndex]
      random[randomIndex] = temporaryValue
    }

    random = random.map(x => x + 1)

    for (let i = 0; i < numberOfScores; i++) {
      const score = await Score.findOne({ index: random[i] })
      scores[i] = score
    }

    response.json(scores)
    } catch (error) {
    response.json({ message: error })
  }
})

// Get five most recent scores.
router.get('/recent', async (request, response) => {
  try {
    var numberOfScores = 4
    var scoreCount = await Score.count()

    var scores = []

    for (let i = 0; i < numberOfScores; i++) {
      const score = await Score.findOne({ index: scoreCount })
      scoreCount--
      scores[i] = score
    }

    response.json(scores)
  } catch (error) {
    response.json({ message: error })
  }
})

// Get five scores with most likes.

// Search for string.
router.get('/search', async (request, response) => {
  try {
    const searchString = request.query.string

    const scores = await Score.find()

    await JSON.parse(scores)

    console.log(scores)



    const results = fuzzysort.go(searchString, scores, {
      keys: searchKeys,
      threshold: -100,
      limit: 50,
      allowTypo: true
    })

    JSON.stringify(results)

    response.json(results)
    
/*     var searchResults = []

    results.forEach(result => {
      result.forEach(post => {
        if (post) {
          searchResults.push(post.target)
        }
      })
    }) */

  } catch (error) {
    response.json(error)
  }
})

// Get specific score.
router.get('/:postTitle', (request, response) => {
  try {
    const post = Score.findById(request.params.postID)
    response.json(post)
  } catch (error) {
    response.json({ message: error })
  }
})

module.exports = router