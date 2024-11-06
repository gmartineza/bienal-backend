/**
 * Rutas de la API para la gestión de esculturas.
 * 
 * @module EsculturaRoutes
 */

const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const upload = require('../../middleware/multer');
const esculturaController = require('../controllers/EsculturaController');
const {
  crearEsculturaSchema,
  actualizarEsculturaSchema,
  idSchema
} = require('../validations/EsculturaValidation');

/**
 * @route POST /api/esculturas
 * @description Crea una nueva escultura con imágenes opcionales.
 * @middleware upload.fields(), celebrate(crearEsculturaSchema)
 * @access Público
 */
router.post('/createSculpture', upload.fields([{ name: 'imagenesPre' }, { name: 'imagenesDurante' }, { name: 'imagenesPost' }]),
  celebrate(crearEsculturaSchema), esculturaController.crearEscultura);

/**
 * @route GET /api/esculturas
 * @description Obtiene todas las esculturas.
 * @access Público
 */
router.get('/getAllSculptures', esculturaController.obtenerEsculturas);


/**
 * @route PUT /api/esculturas/:id
 * @description Actualiza una escultura específica con nuevas imágenes opcionales.
 * @middleware upload.fields(), celebrate(actualizarEsculturaSchema)
 * @access Público
*/
router.put('/update/:id', upload.fields([{ name: 'imagenesPre' }, { name: 'imagenesDurante' }, { name: 'imagenesPost' }]), 
celebrate(actualizarEsculturaSchema), esculturaController.actualizarEscultura);

/**
 * @route DELETE /api/esculturas/:id
 * @description Elimina una escultura por su ID.
 * @middleware celebrate(idSchema)
 * @access Público
*/
router.delete('/delete/:id', celebrate(idSchema), esculturaController.eliminarEscultura);

/**
 * @route GET /api/esculturas/buscar
 * @description Busca esculturas por nombre.
 * @access Público
*/
router.get('/searchSculpture', esculturaController.buscarEsculturaPorNombre);

/**
 * @route GET /api/esculturas/:id
 * @description Obtiene una escultura específica por su ID.
 * @middleware celebrate(idSchema)
 * @access Público
 */
router.get('/:id', celebrate(idSchema), esculturaController.obtenerEsculturaPorId);

module.exports = router;
