const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controller');
const  searchValidation  = require('../validations/search.validation');

/**
 * @route POST /api/search
 * @description Ruta para realizar la búsqueda de coincidencias en escultores, esculturas y eventos.
 */
router.post('/searchTerm',
     searchValidation.searchValidation, 
     searchController.search);

module.exports = router;
