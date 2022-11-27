const Lobby = require("../models/lobby");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createNormalGame = async (req, res) => {
  const { playerId } = req.body;
  if (!playerId) {
    throw new BadRequestError("please provide proper lobby data");
  }

  //console.log(req.user.userId);
  // tutaj z tokenu jwt bedziemy brali id użytkownika ktory dołącza i będziemy wrzucać to do bazki

  const newLobby = {
    playerId: [playerId],
    gameType: "normal",
  };

  const lobby = await Lobby.create({ ...newLobby });

  //tutaj po stronie klienta będzie działo się przekierowanie na serwer gry
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

  //console.log(req.user.userId);
  // tutaj z tokenu jwt bedziemy brali id użytkownika ktory dołącza i będziemy wrzucać to do bazki

  candidateLobby = await Lobby.findOne({ code: gameCode });
  if (!candidateLobby) {
    throw new BadRequestError("invalid lobby code");
  }

  //tutaj po stronie klienta będzie działo się przekierowanie na serwer gry

  res.status(StatusCodes.OK).json(candidateLobby);
};

module.exports = {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
};
