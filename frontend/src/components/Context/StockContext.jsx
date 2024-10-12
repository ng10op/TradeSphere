import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [stockData, setStockData] = useState(user?.stocks || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStockData(user?.stocks || []); // Fetch stock data on route change
  }, [user, user?.stocks]);

  const handleUpdateData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/stock/table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email }), // Send user email to backend
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong with the server.");
        throw new Error(
          errorData.error || "Something went wrong with the server."
        );
      }

      const updatedStocks = await response.json(); // Fetch the updated stock data
      setStockData(updatedStocks); // Update stock data in state
    } catch (error) {
      console.error("Error updating stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StockContext.Provider value={{ stockData, loading, handleUpdateData }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
