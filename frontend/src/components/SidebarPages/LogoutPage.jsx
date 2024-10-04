import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Are you sure you want to log out?
        </h1>
        <p className="mb-6">
          Logging out will end your current session. You will need to log in
          again to access your account.
        </p>
        {user && (
          <p className="mb-4 text-gray-600">
            You are currently logged in as <strong>{user.email}</strong>.
          </p>
        )}
        <div className="flex justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Log Out
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
