// src/api/repository/voteRepository.js
const Vote = require('../../db/models/voteModels');

const findVoteByUserAndSculptorAndEvent = (userId, sculptorId, eventId) => {
  return Vote.findOne({ userId, sculptorId, eventId });
};

const createVote = (userId, sculptorId, eventId, score) => {
  const vote = new Vote({ userId, sculptorId, eventId, score });
  return vote.save();
};

module.exports = {
  findVoteByUserAndSculptorAndEvent,
  createVote
};
