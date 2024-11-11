// src/api/repository/voteRepository.js
const Vote = require('../../db/models/voteModels');

const findVoteByUserAndSculptureAndEvent = (userId, sculptureId, eventId) => {
  return Vote.findOne({ userId, sculptureId, eventId });
};

const createVote = (userId, sculptureId, eventId, score) => {
  const vote = new Vote({ userId, sculptureId, eventId, score });
  return vote.save();
};

module.exports = {
  findVoteByUserAndSculptureAndEvent,
  createVote
};
