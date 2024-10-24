const Vote = require('./voteModel');  // Importar el modelo de votos
const Sculpture = require('./sculptureModel');  // Importar el modelo de esculturas
const { findVoteByUserAndSculpture, createVote } = require('../../db/repository/voteRepository');
const mongoose = require('mongoose');

// Controlador para manejar el voto de un usuario
exports.castVote = async (req, res) => {
  const { sculptureId, score } = req.body;
  const userId = req.user.id;

  if (score < 1 || score > 5) {
    return res.status(400).json({ error: 'Score must be between 1 and 5' });
  }

  if (!mongoose.Types.ObjectId.isValid(sculptureId)) {
    return res.status(400).json({ error: 'Invalid sculpture ID' });
  }

  try {
    const existingVote = await findVoteByUserAndSculpture(userId, sculptureId);

    if (existingVote) {
      return res.status(400).json({ error: 'You have already voted for this sculpture' });
    }

    await createVote(userId, sculptureId, score);

    const sculpture = await Sculpture.findById(sculptureId);
    if (!sculpture) {
      return res.status(404).json({ error: 'Sculpture not found' });
    }

    sculpture.totalVotes += 1;
    sculpture.totalScore += score;
    await sculpture.save();

    res.status(201).json({ message: 'Vote cast successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while casting the vote' });
  }
};
