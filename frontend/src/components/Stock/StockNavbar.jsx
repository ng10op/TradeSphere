import React from "react";

const StockNavbar = ({ companyName, ltp, change }) => {
  const isPositive = change >= 0;
  return (
    <div className="flex justify-between items-center bg-white text-black py-4 px-6 shadow-md mt-3 mx-4 rounded-lg">
      {/* Left Section: Company Info */}
      <div className="flex flex-col">
        <span className="text-4xl font-bold">{companyName}</span>
        <span
          className={`text-xl mt-1 ml-1 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          ₹{ltp} ({change}% {isPositive ? "↑" : "↓"})
        </span>
      </div>

      {/* Right Section: Buttons */}
      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
          <i className="fa fa-bell mr-2"></i>
          Create Alert
        </button>
        <button className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full">
          <i className="fa fa-bookmark mr-2"></i>
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default StockNavbar;
