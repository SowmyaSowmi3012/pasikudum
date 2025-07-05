const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserProfile,
  getOrCreateUser,
  updateUserProfile,
} = require("../controllers/userController");

router.get("/", getAllUsers);                    // GET /api/user/
router.get("/:uid", getOrCreateUser);            // GET /api/user/:uid
router.put("/:uid", updateUserProfile);          // PUT /api/user/:uid

module.exports = router;
