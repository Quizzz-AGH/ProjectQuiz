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
  // winner: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User", //playerId
  // },
  eloChanged: {
    type: Number,
  },
});

module.exports = mongoose.model("GameHistory", gameHistorySchema);
