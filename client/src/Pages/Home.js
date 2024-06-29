import React from "react";
import { useParams } from "react-router-dom";

const Home = () => {
  const { sessionId } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our Subscription Service
      </h1>
      <p className="text-lg">
        Discover our range of subscription plans and choose the one that fits
        your needs.
      </p>
      {sessionId && (
        <p className="mt-4 text-sm text-gray-600">
          Session ID: <span className="font-semibold">{sessionId}</span>
        </p>
      )}
    </div>
  );
};

export default Home;
