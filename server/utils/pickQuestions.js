const Question = require("../models/question");
const CustomError = require("../errors");

const QUESTION_LIMIT = 3;

// pick random questions from the database
// return an array of question ids
const pickRandomQuestions = async () => {
  const questions = await Question.find({}).select({ _id: 1 });

  return getMultipleRandom(questions, QUESTION_LIMIT);
};

// get multiple random elements from an array
// num is the number of elements to get
const getMultipleRandom = (arr, num) => {
  if (num > arr.length) throw new CustomError.BadRequestError("Not enough questions in the database");

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
};

module.exports = pickRandomQuestions;
