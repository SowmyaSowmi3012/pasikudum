const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/users", adminController.getAllUsers);
router.get("/submitted-recipes", adminController.getSubmittedRecipes);
router.post("/approve/:id", adminController.approveRecipe);
router.delete("/recipe/:id", adminController.rejectRecipe);
router.delete("/delete/:id", adminController.deleteRecipe); // Changed to /delete
router.get("/analytics", adminController.getAnalytics);

module.exports = router;
