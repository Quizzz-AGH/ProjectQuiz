const jwt = require("jsonwebtoken");

// Create a JWT token
// payload is the data that will be stored in the token
// payload is an object
// payload example:
// {
//   "name": "John",
//   "userId": "5f9f9f9f9f9f9f9f9f9f9f9f",
//   "role": "user"
// }
const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Verify if a token is valid
// allows us to read the data stored in the token
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// Attach a cookie to the response
// cookieName is the name of the cookie
// cookieName example: "jwt"
// data is the data that will be stored in the cookie
const attachCookiesToResponse = ({ res, data, cookieName }) => {
  token = createJWT({ payload: data });

  res.cookie(cookieName, token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
