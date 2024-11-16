const express = require('express');
const { createVote, getEventResults } = require('../controllers/voteController');
const { voteValidationRules } = require('../validations/voteValidations');
const path = require('path');

const router = express.Router();

// Ruta para registrar un voto
router.post('/vote', voteValidationRules(), createVote);

// Ruta para obtener resultados de votación por evento
router.get('/resultados/:eventId', getEventResults);

module.exports = router;
