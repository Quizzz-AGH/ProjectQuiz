const mongoose = require("mongoose");
const playersListSchema = require("./playersList");

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
    type: playersListSchema,
    require: [true, "players info must be provided"],
  },
  length: {
    type: Date,
  },
  questions: {
    type: [mongoose.Schema.ObjectId],
    ref: "Question",
    require: [true, "questions must be provided"],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User", //playerId
  },
  result: {
    type: String,
    enum: { values: ["win", "lose", "draw"], message: "{VALUE} is not supported" },
    require: [true, "result must be provided"],
  },
  eloChanged: {
    type: Number,
  },
});

module.exports = mongoose.model("GameHistory", gameHistorySchema);
