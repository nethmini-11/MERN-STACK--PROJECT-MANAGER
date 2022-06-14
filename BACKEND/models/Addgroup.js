const mongoose = require("mongoose");
const Joi = require("joi");

const AddgroupSchema = new mongoose.Schema({
  groupid: {
    type: String,
    required: [true, "groupid is required."],
  },
  mem1: {
    type: String,
    required: [true, "mem1 is required."],
  },
  mem2: {
    type: String,
    required: [true, "mem2 is required."],
  },
  mem3: {
    type: String,
    required: [true, "mem3 number is required."],
  },
  mem4: {
    type: String,
    required: [true, "mem4 number is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Addgroup = new mongoose.model("Addgroup", AddgroupSchema);

const validateAddgroup = (data) => {
  const schema = Joi.object({
    groupid: Joi.string().min(11).max(11).required(),
    mem1: Joi.string().min(4).max(100).required(),
    mem2: Joi.string().min(4).max(100).required(),
    mem3: Joi.string().min(4).max(100).required(),
    mem4: Joi.string().min(4).max(100).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateAddgroup,
  Addgroup,
};
