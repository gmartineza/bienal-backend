import express from 'express';
import { generateToken, generateQRCode, validateQRToken, startTokenInterval } from '../controllers/qrController.js';

const router = express.Router();

// Iniciar el intervalo de regeneración de tokens al iniciar la aplicación
startTokenInterval();

// Ruta para generar el QR
router.get('/generate', async (req, res) => {
  const token = generateToken();
  const eventNumber = req.query.eventNumber;
  const sculptorNumber = req.query.sculptorNumber;

  try {
    const qrCodeData = await generateQRCode(token, eventNumber, sculptorNumber);
    res.json({ qrCode: qrCodeData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para validar el token QR
router.get('/validate', async (req, res) => {
  const { token } = req.query;

  try {
    const isValid = await validateQRToken(token);
    res.json({ valid: isValid });
  } catch (error) {
    console.error('Error al validar el token:', error);
    res.status(500).json({ valid: false });
  }
});

export default router;
