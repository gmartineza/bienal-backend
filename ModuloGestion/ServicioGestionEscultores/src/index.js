/**
 * Archivo principal del servidor para el servicio de gestión de escultores.
 * 
 * Configura la conexión a la base de datos, el middleware de Express, el middleware de manejo de
 * errores de Celebrate y las rutas de la API.
 * 
 * @module Server
 */
const express = require('express');
const { errors } = require('celebrate');
const connectDB = require('../src/config/db');
const routes = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());

connectDB();

app.use('/api', routes);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});