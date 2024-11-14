// src/api/validations/voteValidations.js
const { body } = require('express-validator');

const voteValidationRules = () => {
  return [
    body('userId').isEmail().withMessage('Invalid user ID'),  // Changed to isString
    body('sculptorId').isString().withMessage('Invalid sculptor ID'),  // Changed to isString
    body('eventId').isString().withMessage('Invalid event type'),
    body('score').isInt({ min: 1, max: 5 }).withMessage('Score must be between 1 and 5')
  ];
};

module.exports = { voteValidationRules };
