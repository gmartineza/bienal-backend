// src/api/routes/authRoutes.js

const express = require('express');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware.js');
const { authenticate } = require('../controller/authController.js');

const router = express.Router();

// Ruta de autenticación que verifica el token
router.post('/authenticate', verifyToken, authenticate);
// Ruta de autenticación que verifica el token SOLO PARA ADMINS
router.post('/authenticateAdmin', verifyToken, verifyAdmin, authenticate);
module.exports = router;
