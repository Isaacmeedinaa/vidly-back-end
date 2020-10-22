const { genreSchema } = require("./genre");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: genreSchema, required: true },
  numberInStock: { type: Number, min: 0, max: 255, required: true },
  dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);

const movieValidator = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });

  return schema.validate(movie);
};

exports.movieSchema = movieSchema;
exports.Movie = Movie;
exports.movieValidator = movieValidator;
