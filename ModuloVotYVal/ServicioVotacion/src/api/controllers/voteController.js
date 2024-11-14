// src/api/controllers/voteController.js
const Vote = require('../../db/models/voteModels');
const Sculptor = require('../../db/models/sculptorModels'); // Modelo de escultores
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getEventResults = async (req, res) => {
    const { eventId } = req.params;
    try {
        const results = await Vote.aggregate([
            { $match: { eventId } },  // Filtrar por eventId
            {
                $group: {
                    _id: "$sculptorId",
                    promedioPuntaje: { $avg: "$score" }  // Calcular el promedio de puntaje
                }
            },
            {
                $addFields: {  // Convertir _id (sculptorId) a ObjectId para el lookup
                    sculptorObjectId: { $toObjectId: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "sculptors",
                    localField: "sculptorObjectId", // usar el nuevo campo de ObjectId
                    foreignField: "_id", // _id en sculptors
                    as: "escultorData"
                }
            },
            { $unwind: "$escultorData" },
            {
                $project: {
                    escultorId: "$_id",
                    escultorNombre: "$escultorData.name",
                    promedioPuntaje: 1
                }
            }
        ]);

        res.status(200).json(results);
    } catch (error) {
        console.error("Error al obtener resultados:", error);
        res.status(500).json({ error: "Error al obtener los resultados de votación" });
    }
};

const createVote = async (req, res) => {
    console.log(req.body);
    try {
        const { userId, sculptorId, eventId, score } = req.body;

        if (score < 1 || score > 5) {
            return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
        }

        const existingVote = await Vote.findOne({ userId, sculptorId, eventId });
        if (existingVote) {
            return res.status(400).json({ error: "Ya has votado por este escultor en este evento" });
        }


        const newVote = new Vote({ userId, sculptorId, eventId, score });
        console.log(newVote.sculptorId, newVote.userId, newVote.eventId, newVote.score);
  
        await newVote.save();

        res.status(201).json({ message: "Voto registrado con éxito", vote: newVote });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el voto" });
    }
};

module.exports = { createVote, getEventResults };
