import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the specific error when the user starts typing again
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );
        console.log("Registration successful:", response.data);
        setSuccessMessage("Registration successful!");
        // Clear form fields after successful registration
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.message === "Username already exists"
        ) {
          // Server-side validation error
          setErrors({ ...errors, username: "Username already exists" });
        } else {
          console.error("Error registering:", error);
          // Handle other errors
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> {successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                fill="#FF0000"
                d="M14.348 5.652a.5.5 0 0 1 .708.708l-8.5 8.5a.5.5 0 0 1-.708-.708l8.5-8.5zM5.652 5.652a.5.5 0 0 1 .708 0l8.5 8.5a.5.5 0 0 1-.708.708l-8.5-8.5z"
              />
            </svg>
          </span>
        </div>
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
          htmlFor="email"
          className="block text-lg font-medium text-gray-700"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
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
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
