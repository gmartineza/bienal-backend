const { body } = require('express-validator');

const voteValidationRules = () => {
  return [
    body('sculptureId').isMongoId().withMessage('Invalid sculpture ID'),
    body('score').isInt({ min: 1, max: 5 }).withMessage('Score must be between 1 and 5')
  ];
};

module.exports = {
  voteValidationRules
};