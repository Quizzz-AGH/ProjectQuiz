const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema(
  {
    gameType: {
      type: String,
      enum: {
        values: ["ranked", "normal"],
        message: "{VALUE} is not supported",
      },
      require: [true, "gameType must be provided"],
    },
    length: {
      type: Number,
    },
    playerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, "playerId must be provided"],
    },
    opponentId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    result: {
      type: String,
      enum: { values: ["win", "lose", "draw"], message: "{VALUE} is not supported" },
      require: [true, "result must be provided"],
    },
    eloBefore: {
      type: Number,
    },
    eloChange: {
      type: Number,
    },
    expireAt: { type: Date, expires: "3d", default: Date.now },
  },
  { timestamps: true }
);

gameHistorySchema.statics.limitGameHistory = async function (playerId) {
  const result = await this.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $limit: 1000,
    },
    {
      $out: "gamehistories",
    },
  ]);
};

gameHistorySchema.post("save", async function () {
  await this.constructor.limitGameHistory(this.playerId);
});

module.exports = mongoose.model("GameHistory", gameHistorySchema);
