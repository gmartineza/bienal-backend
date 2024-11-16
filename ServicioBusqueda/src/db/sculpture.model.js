/**
 * Esquema de Mongoose para el modelo de Escultura.
 * 
 * @module EsculturaModel
 */
const mongoose = require('mongoose');

const EsculturaSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  description: { type: String, required: true },
  creation_date: { type: Date, required: true },         
  sculptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sculptor'},
  imagenesPre: [{ type: String }],
  imagenesDurante: [{ type: String }],
  imagenesPost: [{ type: String }],
}, { timestamps: true }); 

module.exports = mongoose.model('Sculpture', EsculturaSchema);