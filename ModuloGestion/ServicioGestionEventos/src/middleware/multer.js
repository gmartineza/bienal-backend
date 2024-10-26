// src/middleware/multer.js
const multer = require('multer');

// Configuración de Multer para recibir archivos de imagen
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
