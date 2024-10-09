import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong with the server.");
        throw new Error(
          errorData.error || "Something went wrong with the server."
        );
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      return data;
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong with the server.");
        throw new Error(
          errorData.error || "Something went wrong with the server."
        );
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(null);
      setToken(null);
      alert("Logged Out Successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const changePassword = async (userData) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/changePass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong with the server.");
        throw new Error(
          errorData.error || "Something went wrong with the server."
        );
      }

      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, signup, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
