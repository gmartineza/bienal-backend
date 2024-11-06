/**
 * Esquemas de validación para las rutas de eventos utilizando Celebrate y Joi.
 * 
 * @module EventValidationSchemas
 */

const { Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

/**
 * Esquema de validación para la creación de un evento.
 * Valida el cuerpo de la solicitud (BODY), asegurando que los campos necesarios están presentes.
 */
const crearEventoSchema = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    theme: Joi.string().optional(),
    sculptors: Joi.array().items(Joi.objectId()).optional(),
    images: Joi.array().items(Joi.string().optional()),
  }),
};

/**
 * Esquema de validación para la identificación de un evento por ID.
 * Valida el parámetro de la solicitud (PARAMS), asegurando que el ID es un ObjectId válido.
 */
const idSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.objectId().required(),
  }),
};

/**
 * Esquema de validación para la consulta de eventos por rango de fechas.
 * Valida los parámetros de consulta (QUERY), asegurando que las fechas de inicio y fin son válidas.
 */
const rangoFechasSchema = {
  [Segments.QUERY]: Joi.object({
    inicio: Joi.date().required(),
    fin: Joi.date().required(),
  }),
};

/**
 * Esquema de validación para la actualización de un evento.
 * Valida el cuerpo de la solicitud (BODY) y el ID en los parámetros (PARAMS),
 */
const actualizarEventoSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.objectId().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    date_inicio: Joi.date().optional(),
    date_fin: Joi.date().optional(),
    location: Joi.string().optional(),
    theme: Joi.string().optional(),
    sculptors: Joi.array().items(Joi.objectId()).optional(),
    images: Joi.array().items(Joi.string().optional()),
    imagenesAEliminar: Joi.array().items(Joi.string()).optional(),
    escultoresAAgregar: Joi.array().items(Joi.objectId()).optional(),
    escultoresAEliminar: Joi.array().items(Joi.objectId()).optional()
  }),
};

module.exports = {
  crearEventoSchema,
  actualizarEventoSchema,
  rangoFechasSchema,
  idSchema
};