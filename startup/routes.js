const express = require("express");
const errorHandler = require("../middleware/errorHandler");
const auth = require("../routes/auth");
const users = require("../routes/users");
const rentals = require("../routes/rentals");
const movies = require("../routes/movies");
const customers = require("../routes/customers");
const genres = require("../routes/genres");

const routes = (app) => {
  app.use(express.json());

  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/rentals", rentals);
  app.use("/api/movies", movies);
  app.use("/api/customers", customers);
  app.use("/api/genres", genres);

  app.use(errorHandler);
};

module.exports = routes;
