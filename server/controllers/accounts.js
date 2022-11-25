const Account = require("../models/account");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await Account.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { accountId: user._id, nickname: user.nickname }, token });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await Account.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { accountId: user._id, username: user.username }, token });
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login,
  logout,
};
