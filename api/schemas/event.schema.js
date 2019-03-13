const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = Schema({
  event: {
    type: String,
    required: [true, 'O evento deve ser informado.'],
    default: undefined
  },
  timestamp: {
      type: Date,
      required: true,
      default: Date.now
  },
})

module.exports = eventSchema
