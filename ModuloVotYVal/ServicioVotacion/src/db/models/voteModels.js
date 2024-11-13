// src/db/models/voteModels.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { 
    type: Number, 
    required: true 
  },
  sculptorId: { 
    type: Number, 
    required: true 
  },
  eventId: { 
    type: String, 
    required: true, 
    enum: ["marmol", "madera", "piedra"] 
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
