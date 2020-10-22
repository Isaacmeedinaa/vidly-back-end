require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

const logging = () => {
  process.on("uncaughtException", (error) => {
    winston.error(error.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (error) => {
    winston.error(error.message);
    process.exit(1);
  });

  winston.exceptions.handle(
    new winston.transports.File({ filename: "exceptions.log" })
  );

  winston.add(
    new winston.transports.File({
      filename: "errors.log",
      level: "error",
    })
  );

  winston.add(
    new winston.transports.File({
      filename: "info.log",
      level: "info",
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  );
};

module.exports = logging;
