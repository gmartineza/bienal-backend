// src/api/models/voteModels.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { 
    type: Number, 
    required: true 
  },
  sculptureId: { 
    type: Number, 
    required: true 
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

module.exports = mongoose.model('Vote', voteSchema);
