const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    // require: [true, "accountId must be provided"],
  },
  gameType: {
    type: String,
    enum: {
      values: ["ranked", "normal"],
      message: "{VALUE} is not supported",
    },
    require: [true, "gameType must be provided"],
  },
  players: {
    type: {
      player1: Number,
      player2: Number,
    }, //playerId
    require: [true, "players info must be provided"],
  },
  questions: {
    type: [Number], //questionId
    require: [true, "questions must be provided"],
  },
});

module.exports = mongoose.model("Game", gameSchema);
