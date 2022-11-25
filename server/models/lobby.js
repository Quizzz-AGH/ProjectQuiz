const mongoose = require("mongoose");

const lobbySchema = new mongoose.Schema({
  code: {
    type: Number,
    // require: [true, "accountId must be provided"],
    unique: true,
  },
  playerId: {
    type: String, //playerId
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
  questions: {
    type: [Object],
    require: [true, "provide questions"],
  },
});

lobbySchema.pre("save", async function () {
  const actualLobbys = await mongoose.model("Lobby", lobbySchema).find();
  let randomCode = -1;

  do {
    randomCode = Math.floor(1000 + Math.random() * 9000);
  } while (actualLobbys.some((e) => e.code === randomCode));
  this.code = randomCode;
});

module.exports = mongoose.model("Lobby", lobbySchema);
