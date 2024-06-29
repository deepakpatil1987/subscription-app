const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  createUser,
  verifyUserCredentials,
  findUserByUsername,
  updateUser,
} = require("../Models/User");
const session = require("express-session");
const bcrypt = require("bcrypt");

// Session configuration
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust secure flag based on your deployment
  })
);

// Validation middleware
const validateRegistration = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// POST /auth/register - Register a new user
// POST /auth/register - Register a new user
router.post("/register", validateRegistration, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await createUser(username, email, hashedPassword);
    req.session.userId = newUser.id; // Set userId in session
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /auth/login - Log in user
// POST /auth/login - Log in user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await verifyUserCredentials(username, password);
    if (user) {
      req.session.userId = user.id; // Set userId in session
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /auth/users/:id - Update user information
router.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const updatedUser = await updateUser(userId, username, hashedPassword);
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
