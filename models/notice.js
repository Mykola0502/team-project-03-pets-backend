const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const Joi = require("joi");

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title"],
    },
    category: {
      type: String,
      enum: ["sell", "lost/found", "in good hands"],
    },
    imgURL: { type: String, required: true },
    name: { type: String },
    dateOfBirth: {
      type: String,
      required: [true, "Set date of birth"],
    },
    breed: {
      type: String,
      required: [true, "Set breed"],
    },
    place: {
      type: String,
      required: [true, "Set place"],
    },
    sex: {
      type: String,
      required: [true, "Set the sex"],
    },
    comments: String,

    favorite: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const addNewNoticeSchema = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.string().required(),
  breed: Joi.string().required(),
  place: Joi.string().required(),
  sex: Joi.string().required(),
  comments: Joi.string(),
});

const updateNoticeToFavoriteSchema = Joi.object({
  favorite: Joi.string().required(),
});

const schemas = {
  addNewNoticeSchema,
  updateNoticeToFavoriteSchema,
};

noticeSchema.post("save", handleMongooseError);

const Notice = model("notice", noticeSchema);

module.exports = {
  Notice,
  schemas,
};