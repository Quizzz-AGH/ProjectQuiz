const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
  code: {
    type: Number,
    require: [true, "accountId must be provided"],
  },
  player: {
    type: Number, //playerId
    require: [true, "playerId must be provided"],
  },
  timeInQueue: {
    type: Date,
  },
  gameType: {
    type: String,
    enum: {
      values: ["ranked", "normal"],
      message: "{VALUE} is not supported",
    },
    require: [true, "gameType must be provided"],
  },
});

module.exports = mongoose.model("Lobby", lobbySchema);
