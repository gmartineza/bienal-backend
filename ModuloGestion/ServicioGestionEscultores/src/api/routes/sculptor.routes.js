const express = require('express');
const router = express.Router();
const SculptorController = require('../controllers/sculptorController');
const SculptorValidation = require('../validations/escultores.validations');

// Ruta para crear una escultura
router.post('/createSculptor',
    SculptorValidation.createSculptorValidation, 
    SculptorController.createSculptor
);

router.get('/getAllSculptors', 
    SculptorController.getAllSculptors
);

router.get('/:id', 
    SculptorController.getSculptorById
);

module.exports = router;
