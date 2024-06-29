const express = require("express");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const subscriptionRoutes = require("./Routes/subscriptionRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Mount auth routes
app.use("/profile", profileRoutes); // Mount profile routes
app.use("/subscriptions", subscriptionRoutes); // Mount subscription routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
