const User = require("../models/user");

const getAllRankings = async (req, res) => {
  const { nickname, rankingScore } = await User.find();

  res.status(200).json({ nickname, rankingScore });
};

module.exports = {
  getAllRankings,
};
