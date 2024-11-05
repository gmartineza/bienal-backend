/**
 * Archivo principal del servidor para el servicio de gestión de esculturas.
 * 
 * Configura la conexión a la base de datos, el middleware de Express, el middleware de CORS, el middleware
 * de manejo de errores de Celebrate y las rutas de la API.
 * 
 * @module Server
 */
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const esculturaRoutes = require('./api/routes/esculturaRoutes');
const cors = require('cors');
const { errors } = require('celebrate');


connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // URL FRONT
  credentials: true // Permitir cookies y encabezados de autenticación
}));

app.use(express.json());

app.use('/api/sculptures', esculturaRoutes);

app.use(errors());

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de esculturas corriendo en el puerto ${PORT}`));