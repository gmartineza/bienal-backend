require('dotenv').config({ path: '../.env' });
const express = require('express');
const { errors } = require('celebrate');
const connectDB = require('../src/config/db');
const routes = require('./api/routes');

// Configuración del entorno
const app = express();
const PORT = process.env.PORT || 5005;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api', routes);

// Manejo de errores de validación
app.use(errors());

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
