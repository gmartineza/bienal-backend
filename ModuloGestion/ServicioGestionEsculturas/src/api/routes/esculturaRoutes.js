const express = require('express');
const { celebrate } = require('celebrate');
const router = express.Router();
const esculturaController = require('../controllers/EsculturaController');
const {
    crearEsculturaSchema,
    actualizarEsculturaSchema,
    obtenerEsculturaPorIDSchema,
    eliminarEsculturaSchema,
    obtenerEsculturaPorNombreSchema, 
} = require('../validations/EsculturaValidation');

router.post('/', celebrate(crearEsculturaSchema,), esculturaController.crearEvento);

router.get('/', eventoController.obtenerEventos);

router.get('/:id', celebrate(obtenerEsculturaPorIDSchema), esculturaController.obtenerEventoPorId);

router.post('/obtenerPorNombre', celebrate(obtenerEsculturaPorNombreSchema), esculturaController.obtenerEventosPorTema);

router.put('/:id', celebrate(actualizarEsculturaSchema), esculturaController.actualizarEvento);

router.delete('/:id', celebrate(eliminarEsculturaSchema), esculturaController.eliminarEvento);

module.exports = router;    