// src/app.js
import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsConfig.js';
import qrRoutes from './api/routes/qrRoutes.js';

const app = express();
app.use(cors(corsOptions));
app.use('/api/qr', qrRoutes);

export default app;