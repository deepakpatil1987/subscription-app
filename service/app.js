const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Adjust the path if necessary

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust based on your frontend server's address
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Use the authentication routes
app.use("/auth", authRoutes);

// Endpoint to get session information
app.get("/session", (req, res) => {
  if (req.session.userId) {
    res.json({ sessionId: req.session.id, userId: req.session.userId });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
