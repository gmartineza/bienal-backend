const { celebrate, Joi, Segments } = require('celebrate');

const searchValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    term: Joi.string().required(),
  })
});

module.exports = {
  searchValidation
};
