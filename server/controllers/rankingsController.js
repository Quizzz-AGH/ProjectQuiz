const Rankings = require("../models/ranking");

// returns all rankings and points to the user's ranking
// for the purpose of displaying the leaderboard
// and the user's position on it
const getAllRankings = async (req, res) => {
  const { user } = req;

  const rankings = await Rankings.find({}).sort({ rankingScore: -1 });
  const myRanking = rankings.find((ranking) => ranking.user.toString() === user.userId);

  res.status(200).json({ rankings, myRanking });
};

module.exports = {
  getAllRankings,
};
