const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  theme: { type: String },
  sculptors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Escultor' }], 
  sculptures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Escultura' }], 
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Imagen' }], 
}, { timestamps: true });

module.exports = mongoose.model('Evento', EventoSchema);
