const mongoose = require("mongoose");

// Define the schema for the Contact subdocument
const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
});

// Define the main User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
