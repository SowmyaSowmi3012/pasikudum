// backend/src/routes/submitRecipeRoute.js
const express = require("express");
const router = express.Router();
const SubmittedRecipe = require("../model/SubmittedRecipe");

router.post("/", async (req, res) => {
  try {
    const newRecipe = new SubmittedRecipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe submitted!" });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err });
  }
});

module.exports = router;
