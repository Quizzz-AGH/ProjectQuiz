const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "nickname must be provided"],
    maxlength: 50,
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    require: [true, "password must be provided"],
    minlength: 6,
  },
  gamesPlayed: {
    type: Number,
    require: [true, "gamesPlayed must be provided"],
    default: 0,
  },
  gamesWon: {
    type: Number,
    require: [true, "gamesWon must be provided"],
    default: 0,
  },
  rankingScore: {
    type: Number,
    require: [true, "rankingScore must be provided"],
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    require: false,
    default: false,
  },
});

accountSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

accountSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};


accountSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Account", accountSchema);
