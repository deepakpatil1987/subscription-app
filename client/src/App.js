import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StripeProvider from "./Components/StripeProvider";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Subscribe from "./Pages/Subscribe";
import SubscriptionManagement from "./Pages/SubscriptionManagement";
import Profile from "./Pages/Profile"; // Import Profile component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Adjust as per your login logic

  return (
    <Router>
      <StripeProvider>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route
            path="/subscription-management"
            element={<SubscriptionManagement />}
          />
          <Route path="/profile" element={<Profile />} />{" "}
          {/* Add route for Profile component */}
          {/* Define other routes here */}
        </Routes>
      </StripeProvider>
    </Router>
  );
};

export default App;
