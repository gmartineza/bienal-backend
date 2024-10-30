// src/api/repository/voteRepository.js
const Vote = require('../../db/models/voteModels');


const findVoteByUserAndSculpture = (userId, sculptureId) => {
  return Vote.findOne({ userId, sculptureId });
};

const createVote = (userId, sculptureId, score) => {
  const vote = new Vote({ userId, sculptureId, score });
  return vote.save();
};

module.exports = {
  findVoteByUserAndSculpture,
  createVote
};
