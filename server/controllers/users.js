const Account = require("../models/account");

const getAllUsers = async (req, res) => {
  const { accountId, nickname } = req.querry;
  const querryObject = {};

  if (accountId) {
    querryObject.accountId = accountId;
  }
  if (nickname) {
    querryObject.nickname = nickname;
  }

  const users = await Account.find(querryObject);
  res.status(200).json({ users });
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
