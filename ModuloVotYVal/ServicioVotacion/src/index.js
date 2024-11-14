// Importaciones
const express = require('express');
const mongoose = require('mongoose');
const voteRoutes = require('./api/routes/voteRoutes');

// Crear una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/votes', voteRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
