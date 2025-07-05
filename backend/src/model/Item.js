const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  image: String,
  ingredients: [String],
  instructions: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
