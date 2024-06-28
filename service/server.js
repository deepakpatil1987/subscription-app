// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require("./Routes/authRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const subscriptionRoutes = require("./Routes/subscriptionRoutes");

app.use("/auth", authRoutes); // Mount auth routes
app.use("/profile", profileRoutes); // Mount profile routes
app.use("/subscriptions", subscriptionRoutes); // Mount subscription routes

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
