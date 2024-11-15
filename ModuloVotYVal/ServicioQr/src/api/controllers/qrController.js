// src/api/controllers/qrController.js
import jwt from 'jsonwebtoken';
import QRCode from 'qrcode';
import { generateUniqueUrl } from '../../services/QrService.js';
import { SECRET_KEY } from '../../config/corsConfig.js';

export const generateQR = async (req, res) => {
  try {
    const { numeroevento, numeroescultor } = req.params;
    const token = jwt.sign({ numeroevento, numeroescultor }, SECRET_KEY, { expiresIn: '60s' });

    console.log(`Nuevo token generado: ${token}`);
    const uniqueUrl = generateUniqueUrl(token, numeroevento, numeroescultor);
    const qrCodeImage = await QRCode.toDataURL(uniqueUrl);

    res.json({ qrCodeImage, uniqueUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error generating QR code' });
  }
};

export const verifyToken = (req, res) => {
  const { token, numeroevento, numeroescultor } = req.params;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.numeroevento === numeroevento && decoded.numeroescultor === numeroescultor) {
      res.json({ message: 'QR code is valid', event: numeroevento, sculptor: numeroescultor });
    } else {
      res.status(401).json({ error: 'Invalid QR code' });
    }
  } catch (error) {
    res.status(401).json({ error: 'QR code expired or invalid' });
  }
};