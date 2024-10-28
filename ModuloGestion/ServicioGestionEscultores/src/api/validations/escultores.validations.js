const { celebrate, Joi, Segments } = require('celebrate');

const createSculptorValidation  = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    biography: Joi.string().required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().optional()
    }).required(),
    profileImage: Joi.string().optional(),
    works: Joi.array().items(Joi.string()).optional(),
  })
});

module.exports = {
  createSculptorValidation ,
};
