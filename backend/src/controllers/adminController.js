const mongoose = require("mongoose");
const User = require("../model/User");
const SubmittedRecipe = require("../model/SubmittedRecipe");
const Recipe = require("../model/ItemModel");
const admin = require("../firebase/firebaseAdmin");
const SavedRecipe = require("../model/SavedRecipe");

/* ──────────────────────────────────────────────────────────── */
/* USERS                                                       */
/* ──────────────────────────────────────────────────────────── */

exports.getAllUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
};

/* ──────────────────────────────────────────────────────────── */
/* SUBMISSIONS LIST                                            */
/* ──────────────────────────────────────────────────────────── */

exports.getSubmittedRecipes = async (req, res) => {
  const recipes = await SubmittedRecipe.find().sort({ createdAt: -1 });
  res.json(recipes);
};

/* ──────────────────────────────────────────────────────────── */
/* APPROVE a submission → insert into Item collection          */
/* ──────────────────────────────────────────────────────────── */

exports.approveRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await SubmittedRecipe.findById(id);
    if (!submission) return res.status(404).json({ message: "Not found" });

    const moreSafe = submission.more?.length
      ? submission.more
      : [{
          prep_time: "N/A",
          cook_time: "N/A",
          difficulty: "Unknown",
          servings: "1",
          source: "Submitted by user"
        }];

    const submittedMore = submission.more?.[0] || {};

    const cleanedIngredients = (submission.ingredients || []).filter(
      ing => ing.name?.trim() && ing.quantity?.trim()
    );

    const categoryMenuMap = {
      Entrees: 1,
      Breakfast: 2,
      Lunch: 3,
      Desserts: 4,
      Sides: 5,
      Drinks: 6
    };

    const newRecipe = await Recipe.create({
      name: submission.name,
      description: submission.description || "No description",
      thumbnail_image: submission.thumbnail_image || "",
      category: submission.category || "Misc",
      instructions: submission.instructions || "Instructions not provided.",
      ingredients: cleanedIngredients,
      tags: submission.tags || [],
      menuId: categoryMenuMap[submission.category] || Date.now(),
      comments: [],
      more: [{
        prep_time: submittedMore.prep_time || "N/A",
        cook_time: submittedMore.cook_time || "N/A",
        servings: submittedMore.servings || "1",
        difficulty: submittedMore.difficulty || "Unknown",
        source: submittedMore.source || "User submitted",
      }],
    });

    await submission.deleteOne();
    res.json({ message: "Approved & added to main recipes", newRecipe });

  } catch (err) {
    console.error("🔥 Error approving recipe:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ──────────────────────────────────────────────────────────── */
/* REJECT (delete) a submission                                */
/* ──────────────────────────────────────────────────────────── */

exports.rejectRecipe = async (req, res) => {
  try {
    const deleted = await SubmittedRecipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Submission not found' });
    res.status(200).json({ message: 'Submission rejected and deleted.' });
  } catch (err) {
    console.error("Error rejecting recipe:", err);
    res.status(500).json({ message: 'Server error during rejection' });
  }
};

/* ──────────────────────────────────────────────────────────── */
/* DELETE a recipe already in the Item collection              */
/* ──────────────────────────────────────────────────────────── */

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }

    const deleted = await Recipe.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });

    res.json({ message: "Recipe deleted" });
  } catch (err) {
    console.error("🔥  Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ──────────────────────────────────────────────────────────── */
/* DASHBOARD ANALYTICS                                         */
/* ──────────────────────────────────────────────────────────── */

exports.getAnalytics = async (req, res) => {
  try {
    const recipesCount   = await Recipe.countDocuments();
    const savedCount     = await SavedRecipe.countDocuments();
    const submittedCount = await SubmittedRecipe.countDocuments();
    const fbUsers        = await admin.auth().listUsers();
    const usersCount     = fbUsers.users.length;

    res.json({
      users:     usersCount,
      recipes:   recipesCount,
      saved:     savedCount,
      submitted: submittedCount,
    });
  } catch (err) {
    console.error("🔥 Analytics error:", err);
    res.status(500).json({ error: err.message });
  }
};
