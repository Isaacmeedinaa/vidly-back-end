const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isGold: { type: Boolean, required: true },
  phone: { type: String, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

const customerValidator = (customer) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(customer);
};

exports.customerSchema = customerSchema;
exports.Customer = Customer;
exports.customerValidator = customerValidator;
