// src/api/routes/voteRoutes.js
const express = require('express');
const { createVote } = require('../controllers/voteController');

const router = express.Router();

// Ruta para registrar un voto
router.post('/vote', createVote);

module.exports = router;
