const mongoose = require("mongoose");

const playersListSchema = new mongoose.Schema({
  player1: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "player1 must be provided"] },
  player2: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = playersListSchema;
