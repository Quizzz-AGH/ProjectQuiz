const mongoose = require("mongoose");
const { pickRandomQuestions } = require("../utils/pick-questions");
const playersListSchema = require("./playersList");

const lobbySchema = new mongoose.Schema({
  code: {
    type: Number,
    require: [true, "game code must be provided"],
    unique: true,
  },
  players: {
    type: playersListSchema,
    require: [true, "players must be provided"],
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
    type: [mongoose.Schema.ObjectId],
    ref: "Question",
    require: [true, "provide questions"],
  },
});

lobbySchema.pre("save", async function () {
  if (this.playersId.length !== 1) return; // obejscie do zmiany w przyszlosci, potrzebowalem tego zeby kod generwoal sie tylko przy tworzeniu

  this.questions = await pickRandomQuestions();

  const actualLobbys = await mongoose.model("Lobby", lobbySchema).find();
  let randomCode = -1;

  do {
    randomCode = Math.floor(1000 + Math.random() * 9000);
  } while (actualLobbys.some((e) => e.code === randomCode));
  this.code = randomCode;
});

module.exports = mongoose.model("Lobby", lobbySchema);
