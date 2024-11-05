// src/api/validations/voteValidations.js
const { body } = require('express-validator');

const voteValidationRules = () => {
  return [
    body('userId').isInt().withMessage('Invalid user ID'),
    body('sculptureId').isInt().withMessage('Invalid sculpture ID'),
    body('eventId').isInt().withMessage('Invalid event ID'),
    body('score').isInt({ min: 1, max: 5 }).withMessage('Score must be between 1 and 5')
  ];
};

module.exports = { voteValidationRules };
