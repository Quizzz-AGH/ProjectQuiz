const mongoose = require("mongoose");

// this is a subdocument schema
// it is used to create a subdocument in the questionSchema
// each subdocument will have a text, correct, timesAnswered
// the correct property is used to determine if the answer is correct or not
// example:
// {
//   "text": "Paris",
//   "correct": true,
//   "timesAnswered": 0
// }

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

// this is the main schema
// it is used to create a document in the questions collection
// example:
// {
//   "text": "What is the capital of France?",
//   "answers": [
//     {
//       "text": "Paris",
//       "correct": true,
//       "timesAnswered": 0
//     },
//     {
//       "text": "London",
//       "correct": false,
//       "timesAnswered": 0
//     },
//     {
//       "text": "Berlin",
//       "correct": false,
//       "timesAnswered": 0
//     },
//     {
//       "text": "Madrid",
//       "correct": false,
//       "timesAnswered": 0
//     }
//   ],
//   "timesAsked": 0,
//   "createdBy": "5f9f1b0b8b0b2c2b1c8c1c1c"
// }

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "question must be provided"],
    },
    answers: {
      type: [singleAnswerSchema],
      validate: [arrayLimit, "answers must be between 2 and 4"],
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

// this is a custom validator
// it is used to validate the answers array
// the answers array must have between 2 and 4 elements
function arrayLimit(val) {
  return val.length <= 4 && val.length >= 2;
}
module.exports = mongoose.model("Question", questionSchema);
