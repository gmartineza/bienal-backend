// Importaciones
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const voteRoutes = require('../api/routes/voteRoutes'); // Ruta relativa corregida

// Configuración de variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('Error: la variable MONGODB_URI no está definida en el archivo .env');
    process.exit(1); // Finaliza la ejecución si la URI no está definida
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/votes', voteRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
