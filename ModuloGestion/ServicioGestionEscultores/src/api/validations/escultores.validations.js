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

const updateSculptorValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    biography: Joi.string().optional(),
    contactInfo: Joi.object({
      email: Joi.string().email().optional(),
      phone: Joi.string().optional()
    }).optional(),
    profileImage: Joi.string().optional(),
    works: Joi.array().items(Joi.string()).optional(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
});

const deleteSculptorValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = {
  createSculptorValidation ,
  updateSculptorValidation,
  deleteSculptorValidation,
  
};
