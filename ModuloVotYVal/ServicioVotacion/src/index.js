// Importaciones
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const voteRoutes = require('./api/routes/voteRoutes');

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

mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Servir el archivo HTML en la ruta raíz
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/votes', voteRoutes);

// Redirige al formulario HTML al acceder a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html'));
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Visita http://localhost:${PORT}/ para registrar un voto`);
});
