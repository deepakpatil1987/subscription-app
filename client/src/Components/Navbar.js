// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Subscription App</div>
        <div className="space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/subscribe" className="text-white">
            Subscribe
          </Link>
          <Link to="/profile" className="text-white">
            Profile
          </Link>
          {isLoggedIn && (
            <Link to="/subscriptions" className="text-white">
              My Subscriptions
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
