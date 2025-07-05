const admin = require("../firebase/firebaseAdmin");
const User = require("../model/User");

// GET all users from Firebase
exports.getAllUsers = async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map((u) => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName || "",
      photoURL: u.photoURL || "",
       createdAt: new Date(u.metadata.creationTime),
    }));
    res.json(users);
  } catch (error) {
    console.error("Firebase listUsers error:", error);
    res.status(500).json({ message: "Failed to fetch users from Firebase" });
  }
};

// GET or CREATE user from MongoDB or Firebase
exports.getOrCreateUser = async (req, res) => {
  const { uid } = req.params;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      // Fetch from Firebase if not in MongoDB
      const fbUser = await admin.auth().getUser(uid);

      // Create user in MongoDB
      user = await User.create({
        uid,
        name: fbUser.displayName || "Anonymous",
        email: fbUser.email,
        tastePreferences: [],
        dietaryRestrictions: [],
      });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in getOrCreateUser:", err);
    res.status(500).json({ message: "Could not load or create user" });
  }
};

// GET existing MongoDB user only
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

// PUT update profile
exports.updateUserProfile = async (req, res) => {
  const { uid } = req.params;
  const { name, tastePreferences, dietaryRestrictions } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { name, tastePreferences, dietaryRestrictions },
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Failed to update user", err);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};
