import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerArticle from '../OwnerArticle/OwnerArticle';
import NavBar from '../NavBar/NavBar';

function MyDetails() {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    country: '',
    contactNumber: '',
    userID: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("No token found, please login again.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3001/auth/user-details", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setDetails(response.data);
      } else {
        setError("Failed to fetch user details.");
      }
      
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please login again.");
        return;
      }

      const response = await axios.put("http://localhost:3001/auth/update-user", details, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        alert('Details updated successfully!');
        setIsEditing(false); // Go back to view mode after update
      } else {
        setError('Failed to update user details.');
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      setError("Error updating user details.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
    <NavBar/>
    <div className="container mx-auto py-8 px-4">
      
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        <img 
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.1887574231.1729209600&semt=ais_hybrid"
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : isEditing ? (
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto space-y-2">
          {/* Edit form */}
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">First Name</p>
            <input
              type="text"
              name="firstName"
              value={details.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Last Name</p>
            <input
              type="text"
              name="lastName"
              value={details.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Email</p>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">City</p>
            <input
              type="text"
              name="city"
              value={details.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Country</p>
            <input
              type="text"
              name="country"
              value={details.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Contact Number</p>
            <input
              type="text"
              name="contactNumber"
              value={details.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Update Details
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 ml-4"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto space-y-2">
          {/* View mode */}
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300"> 
            <p className="font-medium text-gray-700">First Name</p>
            <p className="text-lg text-gray-900">{details.firstName}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Last Name</p>
            <p className="text-lg text-gray-900">{details.lastName}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Email</p>
            <p className="text-lg text-gray-900">{details.email}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">City</p>
            <p className="text-lg text-gray-900">{details.city}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Country</p>
            <p className="text-lg text-gray-900">{details.country}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">Contact Number</p>
            <p className="text-lg text-gray-900">{details.contactNumber}</p>
          </div>
          <div className="border p-2 rounded-md bg-gray-50 border-gray-300">
            <p className="font-medium text-gray-700">User ID</p>
            <p className="text-lg text-gray-900">{details.userID}</p>
          </div>

          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Details
          </button>
        </div>
      )}

      <div>
        <OwnerArticle/>
      </div>
    </div>
    </>
  );
}

export default MyDetails;
