const Joi = require("joi");

// Defining a Joi schema based on the Mongoose schema.
// This can be used for input validation or data validation.

// First, defining a schema for the subdocument: contactSchema
const addressSchema = Joi.object({
  // The city field should be a string and is required.
  city: Joi.string().required().messages({
    "any.required": "City field is required",
    "string.empty": "City field cannot be empty",
  }),

  // The country field should also be a string and is required.
  country: Joi.string().required().messages({
    "any.required": "Country field is required",
    "string.empty": "Country field cannot be empty",
  }),
});

// Then, creating a Joi schema for the main User schema: userSchema
const userSchema = Joi.object({
  // The email field should be a string, in email format, and is required.
  email: Joi.string().email().required().messages({
    "any.required": "Email field is required",
    "string.empty": "Email field cannot be empty",
    "string.email": "Please enter a valid email address",
  }),

  // The fullname field should be a string and is required.
  fullname: Joi.string().required().messages({
    "any.required": "Fullname field is required",
    "string.empty": "Fullname field cannot be empty",
  }),

  // The password field should be a string and is required.
  password: Joi.string()
    // Password should be at least 6 characters long
    .min(6)
    // Password should contain at least one uppercase letter, one lowercase letter, and one digit
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    // Password should not contain spaces
    .pattern(/^\S*$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      "string.empty": "Password field is required",
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.invert.base": "Password cannot contain spaces",
    }),

  // The contact field should be based on the contactSchema we defined earlier and is required.
  address: addressSchema.required().messages({
    "any.required": "Contact information is required",
  }),
});

// Exporting the Joi schema so that it can be used elsewhere.
module.exports = userSchema;
