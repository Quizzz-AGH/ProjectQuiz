const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema({
  gameId: {
    type: String,
    require: [true, "gameId must be provided"],
  },
  type: {
    type: String, // prawdopodbnie jakis enum tego typu
    enum: {
      values: ["ranked", "normal"],
      message: "{VALUE} is not supported",
    },
    require: [true, "type name must be provided"],
  },
  players: {
    type: Array, //playerId
    require: [true, "player info must be provided"],
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
