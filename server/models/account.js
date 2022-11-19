const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountId: {
    type: Number,
    require: [true, "accountId must be provided"],
  },
  nickname: {
    type: String,
    require: [true, "nickname must be provided"],
  },
  password: {
    type: String,
    require: [true, "password must be provided"],
  },
  gamesPlayed: {
    type: String,
    require: [true, "gamesPlayed must be provided"],
  },
  gamesWon: {
    type: String,
    require: [true, "gamesWon must be provided"],
  },
  rankingScore: {
    type: String,
    require: [true, "rankingScore must be provided"],
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    require: false,
    default: false,
  },
});

module.exports = mongoose.model("Account", accountSchema);
