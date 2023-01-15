const Lobby = require("../models/lobby");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { attachCookiesToResponse, createTokenLobby } = require("../utils");

const createNormalGame = async (req, res) => {
  const { userId } = req.user;

  const newLobby = {
    players: { player1: userId },
    createdBy: userId,
    gameType: "normal",
  };

  const lobby = await Lobby.create({ ...newLobby });
  const tokenLobby = createTokenLobby(lobby);
  attachCookiesToResponse({ res, data: tokenLobby, cookieName: "lobby" });

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
  const tokenLobby = createTokenLobby(lobby);
  attachCookiesToResponse({ res, data: tokenLobby, cookieName: "lobby" });

  res.status(StatusCodes.CREATED).json({ lobby });
};

const joinNormalGame = async (req, res) => {
  const { gameCode } = req.params;
  const { userId } = req.user;
  // userID z plików cookies

  candidateLobby = await Lobby.findOne({ code: gameCode });
  if (!candidateLobby) {
    throw new BadRequestError("invalid lobby code");
  }

  if (candidateLobby.players.player1 === userId) {
    throw new BadRequestError("you're already in this lobby");
  }

  if (candidateLobby.players.player2) {
    throw new BadRequestError("lobby is full");
  }

  candidateLobby.players.player2 = userId;
  candidateLobby.save();

  const tokenLobby = createTokenLobby(candidateLobby);
  attachCookiesToResponse({ res, data: tokenLobby, cookieName: "lobby" });

  res.status(StatusCodes.OK).json(candidateLobby);
};

// ta funkcja jest potrzebna żeby po stronie web socketa pobrać informacje o pytaniach do gry
const getLobbyInfo = async (req, res) => {
  {
    const { id } = req.params;

    let candidateLobby = await Lobby.findOne({ _id: id });
    if (!candidateLobby) {
      throw new BadRequestError("invalid lobby code");
    }

    res.status(StatusCodes.OK).json(candidateLobby);
  }
};

const leaveLobby = async (req, res) => {
  res.cookie("lobby", "leaveLobby", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ success: true });
};

module.exports = {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
  getLobbyInfo,
  leaveLobby,
};
