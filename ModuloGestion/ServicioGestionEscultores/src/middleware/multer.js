/**
 * 
 * Este módulo configura Multer para almacenar temporalmente los archivos cargados
 * directamente en la memoria del servidor, en lugar de guardarlos en el sistema de archivos.
 * 
 * @module MulterConfig
 */
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Configura memoria
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sculptures', 
    format: async () => 'webp',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

// Configura carga en memoria
const upload = multer({ storage: storage });

module.exports = upload;