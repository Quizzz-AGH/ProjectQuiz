const GameHistory = require("../models/gameHistory");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

saveGameHistory = async (req, res) => {
  const gameHistory = await GameHistory.create({ ...req.body });
  res.status(200).json({ gameHistory });
};

getMyAllGameHistory = async (req, res) => {
  const { userId } = req.user;
  const gameHistory = await GameHistory.find({ playerId: userId }).sort({ createdAt: -1 });

  res.status(200).json({ gameHistory, count: gameHistory.length });
};

getSingleGameHistory = async (req, res) => {
  const {
    user,
    params: { gameId },
  } = req;

  const gameHistory = await GameHistory.findOne({ _id: gameId });
  if (!gameHistory) {
    throw new CustomError.NotFoundError("No game with this id");
  }
  checkPermissions(user, gameHistory.playerId);

  res.status(200).json({ gameHistory });
};

module.exports = {
  saveGameHistory,
  getMyAllGameHistory,
  getSingleGameHistory,
};
