// src/api/routes/qrRoutes.js
import express from 'express';
import { generateQR, verifyToken } from '../controllers/qrController.js';

const router = express.Router();

router.get('/generate-qr/:numeroevento/:numeroescultor', generateQR);
router.get('/:token/:numeroevento/:numeroescultor', verifyToken);

export default router;
