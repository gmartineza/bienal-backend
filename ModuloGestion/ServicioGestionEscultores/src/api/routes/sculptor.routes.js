/**
 * Rutas para la gestión de escultores.
 * 
 * @module SculptorRoutes
 */
const express = require('express');
const router = express.Router();
const SculptorController = require('../controllers/SculptorController');
const SculptorValidation = require('../validations/escultores.validations');
const upload = require('../../middleware/multer');

/**
 * @route POST /api/sculptors/createSculptor
 * @description Crea un nuevo escultor con una imagen de perfil opcional.
 * @middleware upload.single('profileImage'), SculptorValidation.createSculptorValidation
 */
router.post('/createSculptor', upload.single('profileImage'), SculptorValidation.createSculptorValidation,
    SculptorController.createSculptor);

/**
 * @route GET /api/sculptors/getAllSculptors
 * @description Obtiene todos los escultores.
 */
router.get('/getAllSculptors', SculptorController.getAllSculptors);

/**
 * @route GET /api/sculptors/search
 * @description Busca escultores por nombre y apellido. Realiza una búsqueda parcial e insensible a mayúsculas.
 */
router.get('/searchSculptor', SculptorController.searchSculptorByName);

/**
 * @route GET /api/sculptors/:id
 * @description Obtiene un escultor específico por su ID.
 */
router.get('/:id',SculptorController.getSculptorById);

/**
 * @route PUT /api/sculptors/update/:id
 * @description Actualiza un escultor específico por su ID, con una imagen de perfil opcional.
 * @middleware upload.single('profileImage'), SculptorValidation.updateSculptorValidation
 */
router.put('/update/:id',upload.single('profileImage'),SculptorValidation.updateSculptorValidation,
    SculptorController.updateSculptorById);

/**
 * @route DELETE /api/sculptors/delete/:id
 * @description Elimina un escultor específico por su ID.
 * @middleware SculptorValidation.deleteSculptorValidation
 */
router.delete('/delete/:id',SculptorValidation.deleteSculptorValidation,
    SculptorController.deleteSculptorById);

module.exports = router;