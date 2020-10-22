const winston = require("winston");

const errorHandler = (err, req, res, next) => {
  winston.error(err.message);
  res.status(500).send("An error occurred. Please try again later.");
};

module.exports = errorHandler;
