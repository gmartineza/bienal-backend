// Importaciones
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Importa el módulo 'path'
const voteRoutes = require('./api/routes/voteRoutes');

// Configuración de variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public'

// Conexión a MongoDB
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('Error: la variable MONGODB_URI no está definida en el archivo .env');
    process.exit(1); // Finaliza la ejecución si la URI no está definida
}

mongoose.connect(uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/votes', voteRoutes);

// Ruta para servir el archivo HTML de prueba
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test.html')); // Asegúrate de que el archivo test.html esté en la carpeta 'public'
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Visita http://localhost:${PORT}/ para probar la API de votación`);
});
