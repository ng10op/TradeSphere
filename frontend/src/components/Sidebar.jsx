import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-white shadow-lg fixed top-0 left-0 h-full">
      <div className="flex items-center flex-shrink-0 p-4 ml-3 mt-3">
        <img
          className="w-auto h-8 mr-3"
          src="/icon.ico"
          alt="TradeSphere Logo"
        />
        <h1 className="font-bold text-2xl text-gray-800">TradeSphere</h1>
      </div>

      <div className="px-4 mt-6">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            type="search"
            id="search"
            className="block w-full py-2 pl-10 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            placeholder="Search here"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <i className="fas fa-search w-5 h-5 text-gray-400"></i>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <hr className="border-black" />
      </div>

      <nav className="flex-1 flex flex-col px-3 mt-6 space-y-2">
        {/* Existing Links */}
        <Link
          to="/dashboard"
          className={`flex items-center px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/dashboard"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-tachometer-alt flex-shrink-0 w-5 h-5 mr-4"></i>
          Dashboard
        </Link>

        <Link
          to="/stocks"
          className={`flex items-center px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/stocks"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-chart-line flex-shrink-0 w-5 h-5 mr-4"></i>
          Stocks
        </Link>

        <Link
          to="/profile"
          className={`flex items-center px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/profile"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-user flex-shrink-0 w-5 h-5 mr-4"></i>
          Profile
        </Link>

        <Link
          to="/support"
          className={`flex items-center px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/support"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-life-ring flex-shrink-0 w-5 h-5 mr-4"></i>
          Support
        </Link>

        <Link
          to="/settings"
          className={`flex items-center px-4 py-2.5 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/settings"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-cog flex-shrink-0 w-5 h-5 mr-4"></i>
          Settings
        </Link>

        {/* News Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full px-4 py-2 text-lg font-medium text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg focus:outline-none"
          >
            <span className="flex items-center">
              <i className="fas fa-newspaper mr-4"></i>{" "}
              {/* Font Awesome Icon for News */}
              News
            </span>
            <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`}></i>
          </button>
          {isOpen && (
            <div className="absolute left-0 w-full mt-1 bg-white shadow-lg rounded-lg z-10">
              <Link
                to="https://www.cnbc.com"
                target="_blank"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Market News
              </Link>
              <Link
                to="https://www.bloomberg.com"
                target="_blank"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Economic News
              </Link>
              <Link
                to="https://www.reuters.com"
                target="_blank"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Global News
              </Link>
              <Link
                to="https://www.finviz.com"
                target="_blank"
                className="block px-4 py-2 text-gray-700 hover:bg-indigo-600 hover:text-white"
              >
                Market Analysis
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Link at Bottom */}
      <div className="px-3 mt-auto mb-3">
        <Link
          to="/logout"
          className={`flex items-center px-4 py-2.5 mb-3 text-lg font-medium transition-all duration-200 ${
            location.pathname === "/logout"
              ? "bg-indigo-600 text-white rounded-lg"
              : "text-gray-900 hover:text-white hover:bg-indigo-600 rounded-lg"
          }`}
        >
          <i className="fas fa-sign-out-alt flex-shrink-0 w-5 h-5 mr-4"></i>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
