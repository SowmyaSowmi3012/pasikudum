const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: String,
  tastePreferences: {
    type: [String],      // ✅ array of strings
    default: [],
  },
  dietaryRestrictions: {
    type: [String],      // ✅ array of strings
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
