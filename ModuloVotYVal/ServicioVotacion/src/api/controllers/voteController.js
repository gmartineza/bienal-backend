const Vote = require('../../db/models/voteModels');

// Función para crear una nueva votación
const createVote = async (req, res) => {
    try {
        const { userId, sculptureId, eventId, score } = req.body;

        // Verifica que el voto esté dentro del rango permitido (1-5)
        if (score < 1 || score > 5) {
            return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
        }

        // Verificar si ya existe un voto para esta combinación de userId, sculptureId y eventId
        const existingVote = await Vote.findOne({ userId, sculptureId, eventId });
        if (existingVote) {
            return res.status(400).json({ error: "Ya has votado por este escultor en este evento" });
        }

        // Crea y guarda el nuevo voto
        const newVote = new Vote({ userId, sculptureId, eventId, score });
        await newVote.save();

        res.status(201).json({ message: "Voto registrado con éxito", vote: newVote });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el voto" });
    }
};

module.exports = { createVote };
