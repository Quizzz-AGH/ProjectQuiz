const mongoose = require("mongoose");

const singleAnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "answer must be provided"],
  },
  correct: {
    type: Boolean,
    required: [true, "correct must be provided"],
    default: false,
  },
  timesAnswered: {
    type: Number,
    default: 0,
  },
});

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "question must be provided"],
    },
    answers: {
      type: [singleAnswerSchema],
      required: [true, "answers must be provided"],
    },
    timesAsked: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "createdBy must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
