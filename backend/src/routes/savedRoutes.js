const express = require("express");
const {
  getSavedRecipes,
  addSavedRecipe,
  deleteSavedRecipe,
} = require("../controllers/savedController");

const router = express.Router();

router.get("/", getSavedRecipes);      // ?uid=abc123
router.post("/", addSavedRecipe);      // body: { uid, recipeId, ... }
router.delete("/:id", deleteSavedRecipe);

module.exports = router;
