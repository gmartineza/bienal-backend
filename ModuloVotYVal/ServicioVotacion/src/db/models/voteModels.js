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

// Para garantizar que un usuario pueda votar solo una vez por escultor en un evento específico
voteSchema.index({ userId: 1, sculptorId: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
