// src/api/routes/authRoutes.js

const express = require('express');
const { verifyToken } = require('../middlewares/authMiddleware.js');
const { authenticate } = require('../controller/authController.js');

const router = express.Router();

// Ruta de autenticación que verifica el token
router.post('/authenticate', verifyToken, authenticate);

module.exports = router;
