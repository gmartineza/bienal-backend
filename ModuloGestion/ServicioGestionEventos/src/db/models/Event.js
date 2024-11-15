/**
 * Esquema de Mongoose para el modelo de Evento.
 * 
 * @module EventoModel
 */
const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date_inicio: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  location: { type: String, required: true },
  theme: { type: String },
  sculptors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sculptor' }],
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Evento', EventoSchema);