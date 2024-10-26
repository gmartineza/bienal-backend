const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const qrRoutes = require('./src/api/routes/QrRoutes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/qr', qrRoutes); // Ruta base para el QR

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
