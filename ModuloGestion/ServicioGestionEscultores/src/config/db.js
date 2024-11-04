/**
 * Conexión a la base de datos de MongoDB.
 * 
 * @module DatabaseConnection
 */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a la base de datos de MongoDB');
    require('../db/models/sculptureModelCopy');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;