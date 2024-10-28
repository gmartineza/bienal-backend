const express = require('express');
const router = express.Router();
const SculptorController = require('../controllers/sculptorController');
const SculptorValidation = require('../validations/escultores.validations');
const upload = require('../../middleware/multer');


// Ruta para crear una escultura
router.post('/createSculptor',
    upload.single('profileImage'),
    SculptorValidation.createSculptorValidation, 
    SculptorController.createSculptor
);

router.get('/getAllSculptors', 
    SculptorController.getAllSculptors
);

// router.get('/:id', 
//     SculptorController.getSculptorById
// );

router.put('/update/:id',
    upload.single('profileImage'),
    SculptorValidation.updateSculptorValidation,
    SculptorController.updateSculptorById
);

router.delete('/delete/:id',
    SculptorValidation.deleteSculptorValidation, 
    SculptorController.deleteSculptorById
);

module.exports = router;
