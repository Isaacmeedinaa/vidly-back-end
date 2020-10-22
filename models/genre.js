const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 5, max: 50 },
});

const Genre = mongoose.model("Genre", genreSchema);

const genreValidator = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.genreValidator = genreValidator;
