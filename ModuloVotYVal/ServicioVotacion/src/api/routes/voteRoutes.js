const express = require('express');
const { createVote } = require('../controllers/voteController');
const { voteValidationRules } = require('../validations/voteValidations');
const path = require('path');

const router = express.Router();

// Rutas para los eventos
router.get('/:eventId', (req, res) => {
    const { eventId } = req.params;
    if (['marmol', 'madera', 'piedra'].includes(eventId)) {
        res.sendFile(path.join(__dirname, '../../public', 'voteForm.html')); // Redirige al formulario de votación específico del evento
    } else {
        res.status(404).send("Evento no encontrado");
    }
});

// Ruta para registrar un voto
router.post('/vote', voteValidationRules(), createVote);

module.exports = router;
