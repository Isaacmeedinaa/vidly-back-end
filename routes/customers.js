const { Customer, customerValidator } = require("../models/customer");
const express = require("express");

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// GET specific customer
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send("Customer does not exist!");

    res.send(customer);
  } catch {
    res.status(404).send("Customer does not exist!");
  }
});

// CREATE a customer
router.post("/", async (req, res) => {
  const { error } = customerValidator(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
});

// UPDATE a customer
router.put("/:id", async (req, res) => {
  const { error } = customerValidator(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
      {
        new: true,
      }
    );

    if (!customer) return res.status(404).send("Customer does not exist!");

    res.send(customer);
  } catch {
    res.status(404).send("Customer does not exist!");
  }
});

// DELETE a customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send("Customer does not exist!");

    res.send(customer);
  } catch {
    res.status(404).send("Customer does not exist!");
  }
});

module.exports = router;
