const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

// 404 Not Found
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
