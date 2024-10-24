const mongoose = require('mongoose');

const EsculturaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true  },
  date: { type: Date, required: true },
  sculptor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Escultor' , required: true }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Imagen' }],
}, { timestamps: true }); 
  
  module.exports = mongoose.model('Escultura', EsculturaSchema);