const mongoose = require('mongoose');

const EscultorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String , required: true },
  contact: { type: String , required: true },
  sculptures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Escultura' }],
}, { timestamps: true });

module.exports = mongoose.model('Escultor', EscultorSchema);