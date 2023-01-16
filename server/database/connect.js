const mongoose = require("mongoose");

// Connect to database
// If connection is successful, return the connection
// If connection fails, throw an error
const connectDatabase = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;
