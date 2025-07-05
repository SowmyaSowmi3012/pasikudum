const SavedRecipe = require("../model/SavedRecipe");

// 1️⃣  GET  /api/saved?uid=XYZ
const getSavedRecipes = async (req, res) => {
  const { uid } = req.query; // Firebase uid from query
  try {
    const query = uid && uid !== "all" ? { uid } : {};
    const saved = await SavedRecipe.find(query).sort({ createdAt: -1 });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch saved recipes" });
  }
};

// 2️⃣  POST /api/saved
// body: { uid, recipeId, title, image }
const addSavedRecipe = async (req, res) => {
  const { uid, recipeId, title, image } = req.body;
  try {
    // prevent duplicates
    const exists = await SavedRecipe.findOne({ uid, recipeId });
    if (exists) return res.status(409).json({ message: "Already saved" });

    const saved = await SavedRecipe.create({ uid, recipeId, title, image });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Could not save recipe" });
  }
};

// 3️⃣  DELETE /api/saved/:id
const deleteSavedRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await SavedRecipe.findByIdAndDelete(id);
    res.json({ message: "Removed from saved list" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete saved recipe" });
  }
};

module.exports = {
  getSavedRecipes,
  addSavedRecipe,
  deleteSavedRecipe,
};
