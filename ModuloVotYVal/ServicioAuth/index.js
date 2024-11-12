// index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Importar cors directamente
const authRoutes = require('./src/api/routes/authRoutes'); // Rutas de autenticación

const app = express();
const PORT = process.env.PORT || 3000

// Configuración de CORS directamente en index.js
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Frontend permitido
    credentials: true, // Permitir el uso de cookies
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Usar configuración de CORS directamente

// Rutas
app.use('/api/auth', authRoutes); // Prefijo para las rutas de autenticación

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
