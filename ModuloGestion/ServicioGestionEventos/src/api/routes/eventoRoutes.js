/**
 * Rutas de la API para la gestión de eventos.
 * 
 * Utiliza Celebrate para validar datos y Multer para la carga de archivos de imagen.
 * 
 * @module EventRoutes
 */
const express = require('express');
const router = express.Router();
const { celebrate } = require('celebrate');
const upload = require('../../middleware/multer');
const eventoController = require('../controller/eventoController');
const {
  crearEventoSchema,
  idSchema,
  rangoFechasSchema,
  actualizarEventoSchema,  
} = require('../validations/eventoValidation');

/**
 * @route POST /api/eventos
 * @description Crea un nuevo evento con una imagen opcional.
 * @middleware upload.single('imagen'), celebrate(crearEventoSchema)
 * @access Público
 */
router.post('/', upload.single('imagen'), celebrate(crearEventoSchema), eventoController.crearEvento);

/**
 * @route GET /api/eventos
 * @description Obtiene todos los eventos.
 * @access Público
 */
router.get('/', eventoController.obtenerTodosLosEventos);

/**
 * @route GET /api/eventos/filtrar
 * @description Filtra eventos por un rango de fechas.
 * @middleware celebrate(rangoFechasSchema)
 * @access Público
 */
router.get('/filtrar', celebrate(rangoFechasSchema), eventoController.obtenerEventosPorRango);

/**
 * @route GET /api/eventos/buscar
 * @description Busca eventos por nombre.
 * @access Público
 */
router.get('/buscar', eventoController.buscarEventoPorNombre);

/**
 * @route DELETE /api/eventos/:id
 * @description Elimina un evento por su ID.
 * @middleware celebrate(idSchema)
 * @access Público
 */
router.delete('/:id', celebrate(idSchema), eventoController.eliminarEvento);

/**
 * @route GET /api/eventos/pasados
 * @description Obtiene todos los eventos pasados.
 * @access Público
*/
router.get('/pasados', eventoController.obtenerEventosPasados);

/**
 * @route GET /api/eventos/actual
 * @description Obtiene el evento actual (si existe).
 * @access Público
*/
router.get('/actual', eventoController.obtenerEventoActual);

/**
 * @route GET /api/eventos/futuros
 * @description Obtiene todos los eventos futuros.
 * @access Público
*/
router.get('/futuros', eventoController.obtenerEventosFuturos);

/**
 * @route GET /api/eventos/:id
 * @description Obtiene un evento específico por su ID.
 * @middleware celebrate(idSchema)
 * @access Público
 */
router.get('/:id', celebrate(idSchema), eventoController.obtenerEventoPorId);

/**
 * @route PUT /api/eventos/:id
 * @description Actualiza un evento específico con múltiples imágenes opcionales.
 * @middleware upload.array('imagenes'), celebrate(actualizarEventoSchema)
 * @access Público
 */
router.put('/:id', upload.array('imagenes'), celebrate(actualizarEventoSchema), eventoController.actualizarEvento);

module.exports = router;
