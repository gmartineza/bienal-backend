const express = require('express');
const connectDB = require('./config/db')
const routes = require('./api/routes/index.routes');

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configurar rutas
app.use('/api', routes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
