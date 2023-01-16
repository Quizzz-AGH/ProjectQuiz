// this function checks if the answer is correct and returns the verdict
checkIfCorrectAnswer = (answerInfo, gameInfo, question) => {
  if (question.answers[answerInfo.chosenAnswer].correct) {
    return { playerId: gameInfo.player.playerId, verdict: true };
  }

  gameInfo.player.healthPoints -= 1;
  return { playerId: gameInfo.player.playerId, verdict: false };
};

// this function checks if the player still has health points
checkIfPlayerStillLives = (playerId, gameInfo) => {
  let player = gameInfo.players.filter((player) => player._id === playerId);

  return player.healthPoints > 0;
};

module.exports = {
  checkIfCorrectAnswer,
  checkIfPlayerStillLives,
};
