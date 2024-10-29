// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const voteRoutes = require('./api/routes/voteRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Configuración de la conexión a MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Sirve la carpeta 'public' para archivos estáticos
app.use(express.static('public'));

// Usar las rutas de votación
app.use('/api', voteRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Accede al formulario en: http://localhost:${PORT}/test.html`);
});
