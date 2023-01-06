const Question = require("../models/question");

const pickRandomQuestions = async () => {
  const questions = await Question.find({});

  return getMultipleRandom(questions, 3);
};

const getMultipleRandom = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

module.exports = { pickRandomQuestions };
