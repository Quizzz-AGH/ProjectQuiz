const CustomError = require("../errors");
const { isTokenValid } = require("../utils/jwt");

// middleware to authenticate user
// if user is not authenticated, throw error
// if user is authenticated, add user to req.user
// and call next
const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }

  try {
    const { name, userId, role } = await isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
};

// middleware to authorize user permissions
// if user is not authorized, throw error
// authorize permissions based on user role
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(`User with role ${req.user.role} is not authorized to access this route`);
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
