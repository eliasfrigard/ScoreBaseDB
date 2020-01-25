const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  composer: {
    type: String,
    default: 'Traditional'
  },

  origin: {
    type: String,
    default: 'Unknown'
  },

  date: {
    type: Date,
    default: Date.now
  },

  path: {
    type: String,
    required: true
  },

  audio: {
    type: String,
    required: true
  },

  likes: Number,
})

module.exports = mongoose.model('Score', ScoreSchema)