const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, userValidator } = require("../models/user");
const express = require("express");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { error } = userValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered!");

  // user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  const token = user.generateAuthToken();

  // With Lodash
  // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));

  // Without Lodash
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

module.exports = router;
