const mongoose = require('mongoose');

const sculptorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  biography: {
    type: String
  },
  country: {
    type: String
  },
  contactInfo: {
    type: Object 
  },
  profileImage: {
    type: String
  },
  works: {
    type: Array, 
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Exportar el modelo
module.exports = mongoose.model('Sculptor', sculptorSchema);
