const Lobby = require("../models/lobby");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createNormalGame = async (req, res) => {
  const { userId } = req.user;
  // tutaj z tokenu jwt bedziemy brali id użytkownika ktory tworzy grę i będziemy wrzucać to do bazki
  console.log(req.user);

  if (!userId) {
    throw new BadRequestError("please provide proper lobby data");
  }

  const newLobby = {
    playersId: [userId],
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
  const { userId } = req.user;
  // tutaj z tokenu jwt bedziemy brali id użytkownika ktory dołącza i będziemy wrzucać to do bazki

  let candidateLobby = await Lobby.findOne({ code: gameCode });
  if (!candidateLobby) {
    throw new BadRequestError("invalid lobby code");
  }

  // tutaj powinna byc walidacja czy to id juz tam w lobby nie istnieje ale na razie jest bez tego
  if (candidateLobby.playersId >= 2) {
    throw new BadRequestError("lobby is full");
  }

  candidateLobby.playersId.push(userId);
  candidateLobby.save();

  //tutaj po stronie klienta będzie działo się przekierowanie na serwer gry
  res.status(StatusCodes.OK).json(candidateLobby);
};

const getLobbyInfo = async (req, res) => {
  {
    // BARDZO INSECURE ZAPYTANIE. DO ZMIANY W PÓŹNIEJSZYM ETAPIE
    const { gameCode } = req.params;

    candidateLobby = await Lobby.findOne({ code: gameCode });
    if (!candidateLobby) {
      throw new BadRequestError("invalid lobby code");
    }

    res.status(StatusCodes.OK).json(candidateLobby);
  }
};

module.exports = {
  createNormalGame,
  createRankedGame,
  joinNormalGame,
  getLobbyInfo,
};
