const GameHistory = require("../models/gameHistory");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

// save game history
// for user, admin
// it also updates the user's elo because of the pre save hook in the model
saveGameHistory = async (req, res) => {
  const { playerId, opponentId } = req.body;
  if (playerId === opponentId) {
    throw new CustomError.BadRequestError("You can't play with yourself");
  }
  const gameHistory = await GameHistory.create({ ...req.body });
  res.status(200).json({ gameHistory });
};

// get all game history for the user
// for user, admin (admin can get all game history)
getMyAllGameHistory = async (req, res) => {
  const { userId } = req.user;
  const gameHistory = await GameHistory.find({ playerId: userId }).sort({ createdAt: -1 });

  res.status(200).json({ gameHistory, count: gameHistory.length });
};

// get single game history
// for user, admin
// used for displaying the game history
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
