/** 
 * Este módulo configura Multer para almacenar temporalmente los archivos cargados
 * directamente en la memoria del servidor, en lugar de guardarlos en el sistema de archivos.
 * 
 * @module MulterConfig
 */
const multer = require('multer');

// Configura memoria
const storage = multer.memoryStorage();

// Configura carga en memoria
const upload = multer({ storage });

module.exports = upload;