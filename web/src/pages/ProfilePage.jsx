import React from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="text-gray-700 rounded-lg shadow-md p-6">
        <h2 className="text-white text-xl font-semibold mb-2">User Information</h2>
        <p className="text-white">
          <span className="font-semibold">Name:</span>{" "}
          {user ? user.username : "Loading..."}
        </p>
        <p className="text-white">
          <span className="font-semibold">Email:</span>{" "}
          {user ? user.email : "Loading..."}
        </p>
        <p className="text-white">
          <span className="font-semibold">Joined:</span>{" "}
          {user ? new Date(user.createdAt).toLocaleDateString() : "Loading..."}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
