const mongoose = require("mongoose");

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
