const Question = require("../models/question");
const CustomError = require("../errors");

const QUESTION_LIMIT = 3;

const pickRandomQuestions = async () => {
  const questions = await Question.find({}).select({ _id: 1 });

  return getMultipleRandom(questions, QUESTION_LIMIT);
};

const getMultipleRandom = (arr, num) => {
  if (num > arr.length) throw new CustomError.BadRequestError("Not enough questions in the database");

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

module.exports = pickRandomQuestions;
