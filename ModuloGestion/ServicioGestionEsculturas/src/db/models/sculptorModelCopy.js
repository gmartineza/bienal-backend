/**
 * Esquema de Mongoose para el modelo de Sculptor.
 * 
 * @module SculptorModel
 */
const mongoose = require('mongoose');

const sculptorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: { type: String, required: true },
  country: { type: String, required: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: false }
  },
  profileImage: { type: String, required: false },
  works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sculpture' }]
}, { timestamps: true });

module.exports = mongoose.model('Sculptor', sculptorSchema);