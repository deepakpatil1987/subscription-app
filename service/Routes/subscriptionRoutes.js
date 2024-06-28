// subscriptionRoutes.js
const express = require("express");
const router = express.Router();

// Mock database (replace with actual database integration)
let subscriptions = [];

// GET /subscriptions/plans - Retrieve available subscription plans
router.get("/plans", (req, res) => {
  // Example: Return predefined subscription plans (mock implementation)
  const plans = [
    { id: 1, name: "Basic", price: 9.99 },
    { id: 2, name: "Standard", price: 19.99 },
    { id: 3, name: "Premium", price: 29.99 },
  ];
  res.json(plans);
});

// POST /subscriptions - Subscribe to a plan
router.post("/", (req, res) => {
  const { userId, planId } = req.body;
  // Example: Create new subscription (mock implementation)
  const newSubscription = { id: subscriptions.length + 1, userId, planId };
  subscriptions.push(newSubscription);
  res.json(newSubscription);
});

// GET /subscriptions - Retrieve current subscription details
router.get("/", (req, res) => {
  const userId = req.query.userId; // Assuming userId is passed as query parameter
  // Example: Fetch user's current subscription (mock implementation)
  const subscription = subscriptions.find((sub) => sub.userId === userId);
  if (subscription) {
    res.json(subscription);
  } else {
    res.status(404).json({ message: "Subscription not found" });
  }
});

// PUT /subscriptions - Update subscription plan
router.put("/", (req, res) => {
  const { userId, planId } = req.body;
  // Example: Update user's subscription plan (mock implementation)
  const index = subscriptions.findIndex((sub) => sub.userId === userId);
  if (index !== -1) {
    subscriptions[index].planId = planId;
    res.json(subscriptions[index]);
  } else {
    res.status(404).json({ message: "Subscription not found" });
  }
});

// DELETE /subscriptions - Cancel subscription
router.delete("/", (req, res) => {
  const userId = req.query.userId; // Assuming userId is passed as query parameter
  // Example: Cancel user's subscription (mock implementation)
  const index = subscriptions.findIndex((sub) => sub.userId === userId);
  if (index !== -1) {
    subscriptions.splice(index, 1);
    res.json({ message: "Subscription cancelled successfully" });
  } else {
    res.status(404).json({ message: "Subscription not found" });
  }
});

module.exports = router;
