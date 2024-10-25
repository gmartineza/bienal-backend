const express = require('express');
const { castVote } = require('../controllers/voteController');
const { voteValidationRules } = require('../validations/voteValidations');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { validationResult } = require('express-validator');

const router = express.Router();

router.post('/vote', isAuthenticated, voteValidationRules(), (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, castVote);

module.exports = router;
