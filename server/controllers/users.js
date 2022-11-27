const Account = require("../models/account");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const { accountId, username } = req.query;
  const querryObject = {};

  if (accountId) {
    querryObject.accountId = accountId;
  }
  if (username) {
    querryObject.username = username;
  }

  const users = await Account.find(querryObject);
  res.status(200).json({ users });
};

const updateUser = async (req, res) => {
  const { accountId } = req.params;
  const { newPassword, newUsername } = req.body;

  const user = await Account.findOne({ _id: accountId });

  if (!user) {
    throw new BadRequestError(`No user with id: ${accountId}`);
  }

  if (newUsername) user.username = newUsername;
  if (newPassword) user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const { accountId } = req.params;
  const user = await Account.findOneAndDelete({ _id: accountId });
  if (!user) {
    throw new BadRequestError(`No user with id: ${accountId}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};