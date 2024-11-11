import express from 'express';
import cors from 'cors';
import qrRoutes from './api/routes/QrRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para analizar JSON

// Rutas
app.use('/api/qr', qrRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
