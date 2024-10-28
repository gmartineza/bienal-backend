const mongoose = require('mongoose');

const sculptorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: false
    }
  },
  profileImage: {
    type: String,
    required: false
  },
  works: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sculpture'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sculptor', sculptorSchema);
