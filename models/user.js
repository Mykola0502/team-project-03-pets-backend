const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
    },
    token: String,
    name: String,
    birthday: {
      type: String,
      match: /^\d{2}.\d{2}.\d{4}$/,
    },
    phone: String,
    city: String,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  category: Joi.string(),
  name: Joi.string(),
  birthday: Joi.string(),
  phone: Joi.string(),
  city: Joi.string(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};

module.exports = {
  schemas,
  User,
};