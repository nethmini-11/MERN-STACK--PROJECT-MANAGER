const mongoose = require("mongoose");
const Joi = require("joi");

const RegisterTopicSchema = new mongoose.Schema({
  groupid: {
    type: String,
    required: [true, "groupid is required."],
  },
  topic: {
    type: String,
    required: [true, "topic is required."],
  },
  field: {
    type: String,
    required: [true, "field is required."],
  },
  des: {
    type: String,
    required: [true, "des number is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const RegisterTopic = new mongoose.model("RegisterTopic", RegisterTopicSchema);

const validateRegisterTopic = (data) => {
  const schema = Joi.object({
    groupid: Joi.string().min(11).max(11).required(),
    topic: Joi.string().min(4).max(100).required(),
    field: Joi.string().min(4).max(100).required(),
    des: Joi.string().min(4).max(100).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateRegisterTopic,
  RegisterTopic,
};
