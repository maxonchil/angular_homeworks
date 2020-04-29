const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;

const Todo = new Schema({
  userId: Number,
  title: String,
  completed: Boolean,
});

const todoValidationSchema = Joi.object({
  userId: Joi.number().required(),
  title: Joi.string().required(),
  completed: Joi.boolean().required(),
});
module.exports = { Todo: mongoose.model("Todo", Todo), todoValidationSchema };
