const express = require('express');
const router = express.Router();
const sculptorRoutes = require('./sculptor.routes');

// Definir las rutas
router.use('/sculptors', sculptorRoutes);

module.exports = router;
