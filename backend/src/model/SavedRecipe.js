const mongoose = require("mongoose");

const savedRecipeSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },      // Firebase user ID
    recipeId: { type: String, required: true }, // Item _id as String
    title: String,
    image: String,
  },
  { timestamps: true } // adds createdAt / updatedAt
);

module.exports = mongoose.model("SavedRecipe", savedRecipeSchema);
