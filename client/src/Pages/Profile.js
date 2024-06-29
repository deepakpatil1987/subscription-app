import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [sessionId, setSessionId] = useState(null); // State to hold session ID
  const navigate = useNavigate(); // Access navigate function from react-router-dom

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      console.log("Login response:", response.data);
      setUserData(response.data.user); // Assuming backend returns user data
      setIsLoggedIn(true);
      setLoginSuccessMessage("Login successful! Welcome to your profile.");
      setLoginError(""); // Clear any previous login errors

      // Generate session ID and store it in state
      const newSessionId = generateSessionId(); // Replace with your session ID generation logic
      setSessionId(newSessionId);

      // Navigate to home with session ID
      navigate(`/home/${newSessionId}`);
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 401) {
        setLoginError("Invalid username or password");
      } else {
        setLoginError("Error logging in. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setLoginSuccessMessage("");
    setLoginError("");
    setSessionId(null); // Clear session ID on logout
    navigate("/"); // Navigate back to login or another appropriate page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    await handleLogin(username, password);
  };

  // Function to generate a random session ID (replace with your actual logic)
  const generateSessionId = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">
          {isLoggedIn ? loginSuccessMessage : ""}
        </h2>
        {!isLoggedIn && (
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
