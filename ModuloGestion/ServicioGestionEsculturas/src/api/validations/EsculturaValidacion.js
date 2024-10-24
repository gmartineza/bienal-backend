const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const crearEsculturaSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    date: Joi.date().required(),
    sculptor: Joi.array().items(Joi.objectId()),
    images: Joi.array().items(Joi.objectId()),
  }),
};


const actualizarEsculturaSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
    sculptor: Joi.array().items(Joi.objectId()),
    images: Joi.array().items(Joi.objectId()),
  }),
};


const obtenerEsculturaPorIDSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};


const eliminarEsculturaSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
};


const obtenerEsculturaPorNombreSchema = {
  [Segments.BODY]: Joi.object().keys({
    theme: Joi.string().required(),
  }),
};

module.exports = {
    crearEsculturaSchema,
    actualizarEsculturaSchema,
    obtenerEsculturaPorIDSchema,
    eliminarEsculturaSchema,
    obtenerEsculturaPorNombreSchema,
};