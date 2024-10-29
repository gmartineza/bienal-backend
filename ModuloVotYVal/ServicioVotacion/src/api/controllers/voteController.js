// src/api/controllers/voteController.js
const Vote = require('../models/voteModels');

// Función para crear una nueva votación
const createVote = async (req, res) => {
    try {
        const { userId, sculptureId, score } = req.body;

        // Verifica que el voto esté dentro del rango permitido (1-5)
        if (score < 1 || score > 5) {
            return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
        }

        // Crea y guarda el voto
        const newVote = new Vote({ userId, sculptureId, score });
        await newVote.save();

        res.status(201).json({ message: "Voto registrado con éxito", vote: newVote });
    } catch (error) {
        console.error("Error al registrar el voto:", error);
        res.status(500).json({ error: "Error al registrar el voto", details: error.message });
    }
};

module.exports = { createVote };
