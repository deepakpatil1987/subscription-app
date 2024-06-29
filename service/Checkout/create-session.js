const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Endpoint to create a Stripe Checkout session
app.post("/Checkout/session", async (req, res) => {
  const { planId, customerEmail } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: planId, // Replace with your Stripe Price ID
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: customerEmail,
      success_url: "http://localhost:3000/success", // Redirect after successful payment
      cancel_url: "http://localhost:3000/cancel", // Redirect after cancelled payment
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
