// Description: This file creates a token for the lobby
const createTokenLobby = (lobby) => {
  return {
    lobbyId: lobby._id,
    gameType: lobby.gameType,
    players: lobby.players,
    questions: lobby.questions,
    code: lobby.code,
  };
};

module.exports = createTokenLobby;
