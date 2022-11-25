const Question = require("../models/question");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const createQuestion = async (req, res) => {
  const question = await Question.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ question });
};

const getAllQuestions = async (req, res) => {
  const { text } = req.query;
  queryObject = {};

  if (text) {
    queryObject.text = { $regex: text, $options: "i" };
  }

  const questions = await Question.find(queryObject);
  res.status(StatusCodes.CREATED).json({ questions });
};

const updateQuestion = async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findOneAndUpdate(
    { _id: questionId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!question) {
    throw new BadRequestError(`No question with id: ${questionId}`);
  }
  res.status(StatusCodes.OK).json({ question });
};

const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const question = await Question.findOneAndDelete({ _id: questionId });

  if (!question) {
    throw new BadRequestError(`No question with id: ${questionId}`);
  }
  res.status(StatusCodes.OK).json({ deletedQuestion: question });
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
