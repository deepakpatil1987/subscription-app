import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin, loginSuccessMessage }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear specific error when user starts typing again
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username: formData.username,
          password: formData.password,
        });
        console.log("Login successful frontend:", response.data);
        onLogin(response.data.user);
        setLoginError("");
      } catch (error) {
        console.error("Error logging in:", error);
        if (error.response && error.response.status === 401) {
          setLoginError("Invalid username or password");
        } else {
          setLoginError("Error logging in. Please try again later.");
        }
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
      {loginSuccessMessage && (
        <p className="text-green-500 text-sm mb-2">{loginSuccessMessage}</p>
      )}
      <div>
        <label
          htmlFor="username"
          className="block text-lg font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-lg font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
