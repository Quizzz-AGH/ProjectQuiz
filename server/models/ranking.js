const mongoose = require("mongoose");

// this is a ranking schema
// it is used to create a document in the rankings collection
// example:
// {
//   "user": "5f9f1b0b8b0b2c2b1c8c1c1c",
//   "gamesPlayed": 0,
//   "gamesWon": 0,
//   "winPercentage": 0,
//   "rankingScore": 0
// }
const rankingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user must be provided"],
  },
  gamesPlayed: {
    type: Number,
    require: [true, "gamesPlayed must be provided"],
    default: 0,
  },
  gamesWon: {
    type: Number,
    require: [true, "gamesWon must be provided"],
    default: 0,
  },
  winPercentage: {
    type: Number,
    require: [true, "winPercentage must be provided"],
    default: 0,
  },
  rankingScore: {
    type: Number,
    require: [true, "rankingScore must be provided"],
    default: 0,
  },
});

module.exports = mongoose.model("Ranking", rankingSchema);
