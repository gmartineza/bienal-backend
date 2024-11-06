/**
 * Validaciones de las rutas de escultores utilizando Celebrate y Joi.
 * 
 * @module SculptorValidations
 */
const { celebrate, Joi, Segments } = require('celebrate');

/**
 * Validación para la creación de un escultor.
 * Valida el cuerpo de la solicitud, asegurando que los campos necesarios están presentes y en el formato correcto.
 */
const createSculptorValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    country: Joi.string().required(),
    biography: Joi.string().required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().optional(),
    }).required(),
    profileImage: Joi.string().optional(),
    works: Joi.array().items(Joi.string()).optional(),
  })
});

/**
 * Validación para la actualización de un escultor.
 * Valida el cuerpo de la solicitud y el parámetro `id`, permitiendo actualizar opcionalmente cada campo.
 */
const updateSculptorValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    biography: Joi.string().optional(),
    country: Joi.string().optional(),
    contactInfo: Joi.object({
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    }).optional(),
    profileImage: Joi.string().optional(),
    works: Joi.object({
      worksToAdd: Joi.array().items(Joi.string()).optional(),
      worksToRemove: Joi.array().items(Joi.string()).optional(),
    }).optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
});

/**
 * Validación para la eliminación de un escultor.
 * Valida el parámetro `id` de la solicitud, asegurando que el ID es proporcionado y es válido.
 */
const deleteSculptorValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
});

module.exports = {
  createSculptorValidation,
  updateSculptorValidation,
  deleteSculptorValidation,
};