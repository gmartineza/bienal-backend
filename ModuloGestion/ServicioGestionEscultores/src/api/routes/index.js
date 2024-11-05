/**
 * Define las rutas principales de la API y delega las rutas específicas a los módulos correspondientes. 
 * 
 * @module MainRoutes
 */

const express = require('express');
const router = express.Router();
const sculptorRoutes = require('./sculptor.routes');

router.use('/sculptors', sculptorRoutes);

module.exports = router;