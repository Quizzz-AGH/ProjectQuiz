const jwt = require("jsonwebtoken");

//this function allows us to verify the token that is sent from the client in cookies
//used to read info about lobby, player, question set etc.
const verifyJwtToken = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { verifyJwtToken };
