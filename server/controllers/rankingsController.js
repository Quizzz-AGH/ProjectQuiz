const Rankings = require("../models/ranking");

const getAllRankings = async (req, res) => {
  const { user } = req;

  const rankings = await Rankings.find({}).sort({ rankingScore: -1 });
  const myRanking = rankings.find((ranking) => ranking.user.toString() === user.userId);

  res.status(200).json({ rankings, myRanking });
};

module.exports = {
  getAllRankings,
};
