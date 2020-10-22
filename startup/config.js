const config = require("config");
const winston = require("winston");

const configuration = () => {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

module.exports = configuration;
