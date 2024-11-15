// src/app.js
import express from 'express';
//import cors from 'cors';
import qrRoutes from './api/routes/QrRoutes.js';

const app = express();
//app.use(cors(corsOptions));
app.use('/api/qr', qrRoutes);

export default app;
