const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema({
  gameId: {
    type: String,
    require: [true, "gameId must be provided"],
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
  length: {
    type: Date,
  },
  answers: {
    type: Array,
  },
  winner: {
    type: String, //playerId
  },
  eloChanged: {
    type: Number,
  },
});

module.exports = mongoose.model("GameHistory", gameHistorySchema);
