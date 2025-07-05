const mongoose = require("mongoose");

const submittedRecipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  thumbnail_image: String,
  category: String,
  more: [
    {
      prep_time: String,
      cook_time: String,
      difficulty: String,
      source: String,
    },
  ],
  ingredients: [
    {
      name: String,
      quantity: String,
    },
  ],
  instructions: String,
}, { timestamps: true });

module.exports = mongoose.model("SubmittedRecipe", submittedRecipeSchema);
