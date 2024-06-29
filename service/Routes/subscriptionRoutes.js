const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../Models/Subscription");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const session = require("express-session");

// Session configuration
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust secure flag based on your deployment
  })
);

// GET /api/subscriptions/plans - Retrieve available subscription plans
router.get("/plans", (req, res) => {
  // Example: Return predefined subscription plans (mock implementation)
  const plans = [
    { id: 1, name: "Basic", price: 9.99 },
    { id: 2, name: "Standard", price: 19.99 },
    { id: 3, name: "Premium", price: 29.99 },
  ];
  res.json(plans);
});

// GET /api/subscriptions - Retrieve user's subscriptions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subscriptions = await getSubscriptions(req.session.userId);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subscriptions - Subscribe to a plan
router.post("/", authMiddleware, async (req, res) => {
  const { planId } = req.body;
  try {
    const subscription = await createSubscription(req.session.userId, planId);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/subscriptions/:id - Update subscription plan
router.put("/:id", authMiddleware, async (req, res) => {
  const { planId } = req.body;
  try {
    const subscription = await updateSubscription(
      req.params.id,
      req.session.userId,
      planId
    );
    if (subscription) {
      res.json(subscription);
    } else {
      res.status(404).json({ message: "Subscription not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/subscriptions/:id - Cancel subscription
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await deleteSubscription(req.params.id, req.session.userId);
    res.json({ message: "Subscription cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/subscriptions/store-plan - Store selected plan in database
router.post("/store-plan", authMiddleware, async (req, res) => {
  const { planId } = req.body;

  try {
    // Insert subscription into the database (example code using mock function)
    const subscription = await createSubscription(req.session.userId, planId);
    if (subscription) {
      res.status(200).json({ message: "Selected plan stored successfully." });
    } else {
      res.status(500).json({ error: "Failed to store selected plan." });
    }
  } catch (error) {
    console.error("Error storing plan:", error);
    res.status(500).json({ error: "Failed to store selected plan." });
  }
});

module.exports = router;
