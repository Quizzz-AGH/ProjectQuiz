const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "question must be provided"],
  },
  answers: {
    type: [String],
    required: [true, "answers must be provided"],
  },
  correctAnswer: {
    type: Number,
    required: [true, "correctAnswer must be provided"],
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
