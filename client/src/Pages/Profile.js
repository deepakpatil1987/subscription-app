import React, { useState } from "react";

const Profile = () => {
  // Mock user data (replace with actual user data or fetch from backend)
  const [user, setUser] = useState({
    id: 1,
    username: "example_user",
    email: "user@example.com",
    // Add other user information as needed
  });

  // State for form inputs
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    // Add other form fields as needed
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (update profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile logic (replace with actual update logic)
    console.log("Form submitted with:", formData);
    // Example: Call backend API to update user profile
    // fetch('/api/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle success or error
    //   console.log('Profile updated successfully:', data);
    // })
    // .catch(error => {
    //   console.error('Error updating profile:', error);
    // });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            required
          />
        </div>
        <div className="mb-4">
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            required
          />
        </div>
        {/* Add more fields for additional user information */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
