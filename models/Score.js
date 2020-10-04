const mongoose = require('mongoose')

/**
 * This is the schema for Scores and required attributes.
 */
const ScoreSchema = mongoose.Schema({
  ID: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },

  filename: {
    type: String,
    required: true,
  },

  composer: {
    type: String,
    required: true,
  },

  songType: {
    type: String,
    required: true,
  },

  songKey: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  collections: {
    type: Array,
  },

  dateWhenAdded: {
    type: Date,
    default: Date.now
  },

  tags: {
    type: Array,
  },

  likes: {
    type: Number,
    default: 0,
  }
})

module.exports = mongoose.model('Score', ScoreSchema)
