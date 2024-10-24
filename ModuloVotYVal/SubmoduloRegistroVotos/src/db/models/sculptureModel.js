const mongoose = require('mongoose');

const sculptureSchema = new mongoose.Schema({

  name: { type: String, required: true },

  totalVotes: { type: Number, default: 0 },

  totalScore: { type: Number, default: 0 }
  
});

module.exports = mongoose.model('Sculpture', sculptureSchema);
