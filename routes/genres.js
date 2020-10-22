const jwtAuthorization = require("../middleware/jwtAuthorization");
const adminAuthorization = require("../middleware/adminAuthorization");
const { Genre, genreValidator } = require("../models/genre");
const express = require("express");

const router = express.Router();

// GET all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// GET specific genre
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("Genre does not exist!");

    res.send(genre);
  } catch {
    res.status(404).send("Genre does not exist!");
  }
});

// CREATE a genre
router.post("/", jwtAuthorization, async (req, res) => {
  const { error } = genreValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// UPDATE a genre
router.put("/:id", async (req, res) => {
  const { error } = genreValidator(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      {
        new: true,
      }
    );

    if (!genre) return res.status(404).send("Genre does not exist!");

    res.send(genre);
  } catch {
    res.status(404).send("Genre does not exist!");
  }
});

// DELETE a genre
router.delete(
  "/:id",
  [jwtAuthorization, adminAuthorization],
  async (req, res) => {
    try {
      const genre = await Genre.findByIdAndRemove(req.params.id);

      if (!genre) return res.status(404).send("Genre does not exist!");

      res.send(genre);
    } catch {
      res.status(404).send("Genre does not exist!");
    }
  }
);

module.exports = router;
