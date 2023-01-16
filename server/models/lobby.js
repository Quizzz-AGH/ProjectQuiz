const mongoose = require("mongoose");
const { pickRandomQuestions } = require("../utils");
const playersListSchema = require("./playersList");

// Schema for lobby
// lobby is created when a user creates a game
// lobby is deleted when the game is expired
// example of lobby:
// {
//   "code": 1234,
//   "players": {
//     "player1": "5f9f5b9b9c9d9e0a10c9d9e0",
//     "player2": "5f9f5b9b9c9d9e0a10c9d9e1"
//   },
//   "gameType": "normal",
//   "questions": [
//     "5f9f5b9b9c9d9e0a10c9d9e2",
//     "5f9f5b9b9c9d9e0a10c9d9e3",
//     "5f9f5b9b9c9d9e0a10c9d9e4",
//     "5f9f5b9b9c9d9e0a10c9d9e5",
//     "5f9f5b9b9c9d9e0a10c9d9e6"
//   ],
//   "createdBy": "5f9f5b9b9c9d9e0a10c9d9e0",
//   "expiresAt": "2020-11-01T09:00:00.000Z"
// }

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

// this function is called before saving (creating, modifing etc.) the lobby
// if the lobby is new (not modified) then it will generate random questions and code
lobbySchema.pre("save", async function () {
  if (!this.isNew) return;

  this.questions = await pickRandomQuestions();
  this.code = await generateRandomLobbyCode();
});

// generate random code for lobby
const generateRandomLobbyCode = async () => {
  const actualLobbys = await mongoose.model("Lobby", lobbySchema).find();
  let randomCode = -1;
  do {
    randomCode = Math.floor(1000 + Math.random() * 9000);
  } while (actualLobbys.some((e) => e.code === randomCode));
  return randomCode;
};

module.exports = mongoose.model("Lobby", lobbySchema);
