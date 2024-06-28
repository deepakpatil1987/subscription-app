// authRoutes.js
const express = require("express");
const router = express.Router();

// Mock database (replace with actual database integration)
let users = [];

// POST /auth/register - Register a new user
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Example: Create new user (mock implementation)
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  res.json(newUser);
});

// POST /auth/login - Log in user
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Example: Find user by username and password (mock implementation)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
