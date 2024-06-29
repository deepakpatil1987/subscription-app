import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const PaymentButton = ({ planId }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    const stripe = await loadStripe("your_stripe_publishable_key");

    try {
      const response = await fetch(
        "http://localhost:5000/subscriptions/session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create Stripe session");
      }

      const session = await response.json();

      // Redirect to Checkout using Stripe.js
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error);
        // Handle error (e.g., display error message to user)
        setErrorMessage(
          "Failed to redirect to checkout. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error handling payment:", error);
      // Handle error (e.g., display error message to user)
      setErrorMessage(
        "Failed to create Stripe session. Please try again later."
      );

      // If Stripe fails, send the planId to the backend for storage
      try {
        await fetch("http://localhost:5000/subscriptions/store-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ planId }),
        });
        console.log("Plan stored in database.");
      } catch (error) {
        console.error("Error storing plan in database:", error);
        // Handle error (e.g., display error message to user)
        setErrorMessage(
          "Failed to store selected plan. Please contact support."
        );
      }
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleClick}
      >
        Subscribe
      </button>
    </div>
  );
};

export default PaymentButton;
