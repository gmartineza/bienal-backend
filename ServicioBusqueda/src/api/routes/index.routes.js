const express = require('express');
const router = express.Router();
const searchRoutes = require('./search.routes');

// Rutas de búsqueda
router.use('/search', searchRoutes);

module.exports = router;
