const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const e = require("express");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "nickname must be provided"],
    maxlength: 50,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email address",
    },
  },
  password: {
    type: String,
    require: [true, "password must be provided"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin", "guest"],
    require: [true, "role must be provided"],
    default: "user",
  },
  expiresAt: { type: Date, expires: "4h", default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, username: this.username, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
