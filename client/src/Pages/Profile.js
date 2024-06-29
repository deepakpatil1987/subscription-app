import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

const Profile = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

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
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginSuccessMessage("");
    }
  };

  const handleRegister = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });
      console.log("Register response:", response.data);
      setUserData(response.data.user); // Assuming backend returns user data
      setIsLoggedIn(true);
      setLoginSuccessMessage(
        "Registration successful! Welcome to your profile."
      );
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setLoginSuccessMessage("");
  };

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">
          {isLoggedIn ? loginSuccessMessage : ""}
        </h2>
        <div>
          <h1 className="text-3xl font-bold text-center mb-6">
            {showRegisterForm ? "Register" : "Login"}
          </h1>
          {showRegisterForm ? (
            <Register onRegister={handleRegister} />
          ) : (
            <Login
              onLogin={handleLogin}
              loginSuccessMessage={loginSuccessMessage}
            />
          )}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleToggleForm}
              className="text-blue-500 hover:text-blue-600 font-medium focus:outline-none"
            >
              {showRegisterForm ? "Login" : "Register"} instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
