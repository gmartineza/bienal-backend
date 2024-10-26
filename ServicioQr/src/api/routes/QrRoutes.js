const express = require('express');
const router = express.Router();
const qrController = require('../controllers/QrController');
const { verifyToken } = require('../../services/QrService');  // Middleware para verificar el token

router.post('/generate-qr', verifyToken, qrController.generateQRToken);
router.get('/validate', validateQRToken);

module.exports = router;
