const express = require('express');
const { celebrate } = require('celebrate');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const {
  crearEventoSchema,
  obtenerEventoSchema, 
  actualizarEventoSchema,
  eliminarEventoSchema,      
  obtenerEventosPorTemaSchema,  
} = require('../validations/eventoValidation');

router.post('/', celebrate(crearEventoSchema), eventoController.crearEvento);

router.get('/', eventoController.obtenerEventos);

router.get('/:id', celebrate(obtenerEventoSchema), eventoController.obtenerEventoPorId);

router.post('/obtenerPorTema', celebrate(obtenerEventosPorTemaSchema), eventoController.obtenerEventosPorTema);

router.put('/:id', celebrate(actualizarEventoSchema), eventoController.actualizarEvento);

router.delete('/:id', celebrate(eliminarEventoSchema), eventoController.eliminarEvento);

module.exports = router;