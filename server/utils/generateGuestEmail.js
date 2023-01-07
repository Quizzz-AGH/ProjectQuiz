const crypto = require("crypto");

const generateGuestEmail = () => {
  return crypto.randomBytes(10).toString("hex") + "@guest.com";
};

module.exports = generateGuestEmail;
