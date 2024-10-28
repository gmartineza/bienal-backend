const express = require('express');
const { celebrate } = require('celebrate');
const router = express.Router();
const eventoController = require('../controller/eventoController');
const {
  crearEventoSchema,  
} = require('../validations/eventoValidation');
const upload = require('../../middleware/multer');

router.post('/', upload.single('imagen'), celebrate(crearEventoSchema), eventoController.crearEvento);

router.get('/', eventoController.obtenerTodosLosEventos);

router.get('/filtrar', eventoController.obtenerEventosPorRango);

router.delete('/:id', eventoController.eliminarEvento);

// Ruta para obtener eventos pasados
router.get('/pasados', eventoController.obtenerEventosPasados);

// Ruta para obtener el evento actual
router.get('/actual', eventoController.obtenerEventoActual);

router.get('/futuros', eventoController.obtenerEventosFuturos);
// Ruta para obtener eventos futuros

router.get('/:id', eventoController.obtenerEventoPorId);

router.put('/:id', upload.array('imagenes'), eventoController.actualizarEvento);

module.exports = router;
