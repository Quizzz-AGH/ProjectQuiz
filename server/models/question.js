const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    require: [true, "questionId must be provided"],
  },
  content: {
    type: {
      text: {
        type: String,
        required: [true, "question must be provided"],
      },
      answers: [
        {
          answer: {
            type: String,
            required: [true, "question must be provided"],
          },
        },
      ],
      correctAnswer: {
        type: Number,
        required: [true, "correctAnswer must be provided"],
      },
    },
  },
  questionStats: {
    type: {
      timesAsked: Number,
      answeredWith: {
        a1: Number,
        a2: Number,
        a3: Number,
        a4: Number,
      },
    },
  },
});

module.exports = mongoose.model("Question", questionSchema);
