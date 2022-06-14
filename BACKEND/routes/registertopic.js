const { validateRegisterTopic, RegisterTopic } = require("../models/RegisterTopic");
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

// create contact.
router.post("/registertopic", auth, async (req, res) => {
  const { error } = validateRegisterTopic(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { groupid,topic,field,des } = req.body;

  try {
    const newRegisterTopic = new RegisterTopic({
      groupid,
      topic,
      field,
      des,
      postedBy: req.user._id,
    });
    const result = await newRegisterTopic.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// fetch contact.
router.get("/myregistertopics", auth, async (req, res) => {
  try {
    const myRegisterTopics = await RegisterTopic.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ registertopics: myRegisterTopics.reverse() });
  } catch (err) {
    console.log(err);
  }
});

// update contact.
router.put("/registertopic", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "no id specified." });
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const registertopic = await RegisterTopic.findOne({ _id: id });

    if (req.user._id.toString() !== registertopic.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't edit other people contacts!" });

    const updatedData = { ...req.body, id: undefined };
    const result = await RegisterTopic.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// delete a contact.
router.delete("/deletetopic/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });
  try {
    const registertopic = await RegisterTopic.findOne({ _id: id });
    if (!registertopic) return res.status(400).json({ error: "no contact found" });

    if (req.user._id.toString() !== registertopic.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't delete other people contacts!" });

    const result = await RegisterTopic.deleteOne({ _id: id });
    const myRegisterTopics = await RegisterTopic.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res
      .status(200)
      .json({ ...registertopic._doc, myRegisterTopics: myRegisterTopics.reverse() });
  } catch (err) {
    console.log(err);
  }
});

// to get a single contact.
router.get("/registertopic/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const registertopic = await RegisterTopic.findOne({ _id: id });

    return res.status(200).json({ ...registertopic._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
