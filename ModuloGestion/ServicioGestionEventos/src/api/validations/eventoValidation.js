const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const crearEventoSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    theme: Joi.string().optional(),
    sculptors: Joi.array().items(Joi.objectId()),
    sculptures: Joi.array().items(Joi.objectId()), 
    images: Joi.array().items(Joi.objectId()),
  }),
};


const actualizarEventoSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
    location: Joi.string().optional(),
    theme: Joi.string().optional(),
    sculptors: Joi.array().items(Joi.objectId()),
    sculptures: Joi.array().items(Joi.objectId()), 
    images: Joi.array().items(Joi.objectId()),
  }),
};


const obtenerEventoPorIDSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};


const eliminarEventoSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};


const obtenerEventosPorTemaSchema = {
  [Segments.BODY]: Joi.object().keys({
    theme: Joi.string().required(),
  }),
};

module.exports = {
  crearEventoSchema,
  actualizarEventoSchema,
  obtenerEventoPorIDSchema,
  eliminarEventoSchema,
  obtenerEventosPorTemaSchema,
};
