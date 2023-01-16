const CustomError = require("../errors");

// middleware to authorize user permissions
// if user is not authorized, throw error
// authorize if user is admin or user is accessing his own data
const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role !== "admin" && requestUser.userId !== resourceUserId.toString()) {
    throw new CustomError.UnauthorizedError("You are not authorized to perform this action");
  }
};

module.exports = checkPermissions;
