const mongoose = require("mongoose");
const { pickRandomQuestions } = require("../utils");
const playersListSchema = require("./playersList");

const lobbySchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      require: [true, "game code must be provided"],
      unique: true,
    },
    players: {
      type: playersListSchema,
      require: [true, "players must be provided"],
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
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "provide createdBy"],
    },
    expiresAt: { type: Date, expires: "1h", default: Date.now },
  },
  { timestamps: true }
);

lobbySchema.pre("save", async function () {
  if (!this.isNew) return;

  this.questions = await pickRandomQuestions();
  this.code = generateRandomLobbyCode();
});

const generateRandomLobbyCode = async () => {
  const actualLobbys = await mongoose.model("Lobby", lobbySchema).find();
  let randomCode = -1;
  do {
    randomCode = Math.floor(1000 + Math.random() * 9000);
  } while (actualLobbys.some((e) => e.code === randomCode));
  return randomCode;
};

module.exports = mongoose.model("Lobby", lobbySchema);
