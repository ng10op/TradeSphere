import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
      alert("Logged Out Successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
