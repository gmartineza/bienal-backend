/**
 * Archivo principal del servidor para el servicio de gestión de eventos.
 * 
 * Configura la conexión a la base de datos, el middleware de Express, el middleware de CORS, el middleware
 * de manejo de errores de Celebrate y las rutas de la API.
 * 
 * @module Server
 */
const connectDB = require('./config/db');
const express = require('express');
const app = express();
const eventoRoutes = require('./api/routes/eventoRoutes');
const cors = require('cors');
const { errors } = require('celebrate');

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL, // URL FRONTEND
  credentials: false // Permite cookies y headers de autenticación
}));


app.use(express.json());

app.use('/api/events', eventoRoutes);

app.use(errors());

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
