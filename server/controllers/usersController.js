const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createTokenUser, generateGuestEmail } = require("../utils");

// return all users from database,
// if query params are provided, return only users that match the query
// if no users are found, return empty array
// for admin only

const getAllUsers = async (req, res) => {
  const { accountId, username } = req.query;
  const querryObject = {};

  if (accountId) {
    querryObject.accountId = accountId;
  }
  if (username) {
    querryObject.username = username;
  }

  const users = await User.find(querryObject);
  res.status(200).json({ users });
};

// update user data
// if user is updating his own data, update the token
// for admin and user
const updateUser = async (req, res) => {
  const { accountId } = req.params;
  const { name: newName, email: newEmail } = req.body;

  const user = await User.findOne({ _id: accountId });

  if (!user) {
    throw new BadRequestError(`No user with id: ${accountId}`);
  }

  if (newName) user.name = newName;
  if (newEmail) user.email = newEmail;

  await user.save();

  if (user._id === req.user.userId) {
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
  }
  res.status(StatusCodes.OK).json({ user });
};

// update user password
// for admin and user
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide current and new password");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthorizedError("Incorrect password");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ success: true });
};

// delete user
// if user is deleting his own account, create guest account
// for admin and user
const deleteUser = async (req, res) => {
  const { accountId } = req.params;
  const user = await User.findOneAndDelete({ _id: accountId });
  if (!user) {
    throw new BadRequestError(`No user with id: ${accountId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserPassword,
};
