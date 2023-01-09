checkIfCorrectAnswer = (answerInfo, gameInfo) => {
  var question = gameInfo.questions.filter(
    (question) => question._id === answerInfo.questionId
  );

  var player = gameInfo.players.filter(
    (players) => player._id === answerInfo.playerId
  );

  if (answerInfo.chosenAnswer === question.correctAnswer) {
    return { playerId: player._id, verdict: true };
  }

  player.healthPoints -= 1;
  return { playerId: player._id, verdict: false };
};

checkIfPlayerStillLives = (playerId, gameInfo) => {
  var player = gameInfo.players.filter((players) => player._id === playerId);

  return player.healthPoints > 0;
};

module.exports = {
  checkIfCorrectAnswer,
  checkIfPlayerStillLives,
};
