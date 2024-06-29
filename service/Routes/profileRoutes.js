const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../Models/User");

const router = express.Router();

// Get user profile
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await getUserProfile(req.session.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put("/", authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  try {
    const updatedUser = await updateUserProfile(req.session.userId, {
      username,
      email,
    });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
