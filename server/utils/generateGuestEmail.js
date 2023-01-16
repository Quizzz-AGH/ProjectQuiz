const crypto = require("crypto");

// Generate a random email for guest users
const generateGuestEmail = () => {
  return crypto.randomBytes(10).toString("hex") + "@guest.com";
};

module.exports = generateGuestEmail;
