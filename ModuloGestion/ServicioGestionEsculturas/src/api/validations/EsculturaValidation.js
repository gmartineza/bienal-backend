/**
 * Esquemas de validación para las rutas de esculturas utilizando Celebrate y Joi.
 * 
 * @module EsculturaValidationSchemas
 */
const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Esquema de validación para la creación de una escultura.
 * Valida el cuerpo de la solicitud (BODY), asegurando que los campos necesarios están presentes.
 */
const crearEsculturaSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    creation_date: Joi.date().required(),
    sculptor: Joi.objectId().optional(),
    imagenPre: Joi.string().optional(),
    imagenDurante: Joi.string().optional(),
    imagenPost: Joi.string().optional(),
  }),
};

/**
 * Esquema de validación para la identificación de una escultura por ID.
 * Valida el parámetro de la solicitud (PARAMS), asegurando que el ID es un ObjectId válido.
 */
const idSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.objectId().required(),
  }),
};

/**
 * Esquema de validación para la actualización de una escultura.
 * Valida el cuerpo opcional de la solicitud (BODY) y el ID en los parámetros (PARAMS),
 */
const actualizarEsculturaSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.objectId().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    creation_date: Joi.date().optional(),
    sculptor: Joi.objectId().optional(),
    imagenPre: Joi.string().optional(),
    imagenDurante: Joi.string().optional(),
    imagenPost: Joi.string().optional(),
  }),
};

module.exports = {
  crearEsculturaSchema,
  actualizarEsculturaSchema,
  idSchema,
};