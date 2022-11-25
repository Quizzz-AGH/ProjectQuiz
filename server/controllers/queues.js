const Lobby = require("../models/lobby");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createNormalGame = async (req, res) => {
  const { playerId } = req.body;
  if (!playerId) {
    throw new BadRequestError("please provide proper lobby data");
  }
  const newLobby = {
    playerId: playerId,
    gameType: "normal",
  };

  const lobby = await Lobby.create({ ...newLobby });
  res.status(StatusCodes.CREATED).json({ lobby });
};

const createRankedGame = async (req, res) => {
  const { playerId } = req.body;
  if (!playerId) {
    throw new BadRequestError("please provide proper lobby data");
  }
  const newLobby = {
    playerId: playerId,
    gameType: "ranked",
  };

  const lobby = await Lobby.create({ ...newLobby });
  res.status(StatusCodes.CREATED).json({ lobby });
};

const joinNormalGame = async (req, res) => {
  const { gameCode } = req.params;
  candidateLobby = await Lobby.findOne({ code: gameCode });
  if (!candidateLobby) {
    throw new BadRequestError("invalid lobby code");
  }

  res.status(StatusCodes.OK).json(candidateLobby);
};

module.exports = {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
};
