// Description: This file creates a token user object from a user object
const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role };
};

module.exports = createTokenUser;
