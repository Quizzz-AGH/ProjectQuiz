const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// this is a user schema
// it is used to create a document in the users collection
// example:
// {
//   "name": "John",
//   "email": "John@mail.com"
//   "password": "123456",
//   "role": "user",
//   "expiresAt": "2020-11-02T14:00:00.000Z"
// }
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

// this is a middleware that will run before the document is saved
// it will hash the password before saving the document
// it will not run if the password is not modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// this is a method that will be available on the document
// it will create a jwt token and return it
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, username: this.username, isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// this is a method that will be available on the document
// it will compare the password with the hashed password
// it will return true if the password is correct
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
