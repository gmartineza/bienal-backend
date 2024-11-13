const express = require('express');
const { createVote } = require('../controllers/voteController');
const { voteValidationRules } = require('../validations/voteValidations');

const router = express.Router();

// Ruta para registrar un voto con validaciones
router.post('/vote', voteValidationRules(), createVote);

module.exports = router;
