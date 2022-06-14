const { validateAddgroup, Addgroup } = require("../models/Addgroup");
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

// create Addgroup.
router.post("/addgroup", auth, async (req, res) => {
  const { error } = validateAddgroup(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { groupid,mem1,mem2,mem3,mem4 } = req.body;

  try {
    const newAddgroup = new Addgroup({
      groupid,
      mem1,
      mem2,
      mem3,
      mem4,
      postedBy: req.user._id,
    });
    const result = await newAddgroup.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// fetch Addgroup.
router.get("/myaddgroups", auth, async (req, res) => {
  try {
    const myAddgroups = await Addgroup.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res.status(200).json({ addgroups: myAddgroups.reverse() });
  } catch (err) {
    console.log(err);
  }
});

// update Addgroup.
router.put("/addgroup", auth, async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ error: "no id specified." });
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const addgroup = await Addgroup.findOne({ _id: id });

    if (req.user._id.toString() !== addgroup.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't edit other people addgroups!" });

    const updatedData = { ...req.body, id: undefined };
    const result = await Addgroup.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

// delete a Addgroup.
router.delete("/deletegroup/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });
  try {
    const addgroup = await Addgroup.findOne({ _id: id });
    if (!addgroup) return res.status(400).json({ error: "no group found" });

    if (req.user._id.toString() !== addgroup.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't delete other people Addgroups!" });

    const result = await Addgroup.deleteOne({ _id: id });
    const myAddgroups = await Addgroup.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res
      .status(200)
      .json({ ...addgroup._doc, myAddgroups: myAddgroups.reverse() });
  } catch (err) {
    console.log(err);
  }
});

// to get a single Addgroup.
router.get("/addgroup/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const addgroup = await Addgroup.findOne({ _id: id });

    return res.status(200).json({ ...addgroup._doc });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
