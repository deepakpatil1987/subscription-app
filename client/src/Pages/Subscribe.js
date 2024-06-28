import React from "react";
import subscriptionPlans from "../Data/plans";

const Subscribe = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Choose a Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-lg text-gray-600">{plan.description}</p>
            <p className="text-xl font-bold mt-2">${plan.price}/month</p>
            <ul className="list-disc mt-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-base text-gray-700">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
