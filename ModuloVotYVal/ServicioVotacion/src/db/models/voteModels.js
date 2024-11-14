
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: {
    type: String,  
    required: true
  },
  sculptorId: {
    type: String,  
    required: true
  },
  eventId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

voteSchema.index({ userId: 1, sculptorId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
