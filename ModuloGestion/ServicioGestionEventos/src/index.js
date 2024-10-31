require('dotenv').config({ path: '../.env' });
const express = require('express');
const app = express();
const eventoRoutes = require('./api/routes/eventoRoutes');
const cors = require('cors');
const connectDB = require('./config/db'); 
const { errors } = require('celebrate'); 

connectDB();
app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

app.use('/api/eventos', eventoRoutes);

// Manejo de errores de Celebrate
app.use(errors());

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
