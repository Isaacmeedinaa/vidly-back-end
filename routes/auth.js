const jwtAuthorization = require("../middleware/jwtAuthorization");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const express = require("express");

const router = express.Router();

// Auth Validator
const authValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
};

// Login
router.post("/login", async (req, res) => {
  const { error } = authValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password!");

  const token = user.generateAuthToken();

  const resObj = {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    token: token,
  };

  res.send(resObj);
});

// Auto Login
router.get("/auto-login", jwtAuthorization, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");
  res.send(user);
});

module.exports = router;
