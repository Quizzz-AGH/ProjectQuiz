const mongoose = require("mongoose");

// this is a subdocument schema
// it is used to create a subdocument in the playersListSchema
// each subdocument will have a player1 and player2
const playersListSchema = new mongoose.Schema({
  player1: { type: mongoose.Schema.ObjectId, ref: "User", required: [true, "player1 must be provided"] },
  player2: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = playersListSchema;
