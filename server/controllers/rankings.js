const Account = require("../models/account");

const getAllRankings = async (req, res) => {
  const { nickname, rankingScore } = await Account.find();

  res.status(200).json({ nickname, rankingScore });
};

module.exports = {
  getAllRankings,
};
