const express = require('express');
const router = express.Router();

// ✅ Destructure the named exports from the controller
const {
  getAllItems,
  getSearchedItems,
  getSingleItems
} = require('../controllers/ItemController');

// 🛠 Define the routes with proper handlers
router.get('/all-items', getAllItems);
router.get('/search', getSearchedItems);
router.get('/item/:id', getSingleItems);

module.exports = router;
