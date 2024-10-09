import React, { useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showStocks, setShowStocks] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [showAcc, setShowAcc] = useState(false);

  const { user } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const { stockData, companyName, ltp, change } = location.state || {};
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Check if the current path matches "/stock/:id"
  const isStockPage = location.pathname.startsWith("/stock");
  const isAnalysisPage = location.pathname.startsWith("/stock-analysis");

  const handleBackClick = () => {
    // Use a variable to hold the stock ID if necessary
    if (isAnalysisPage) {
      navigate(`/stock/${id}`, {
        state: { stockData, companyName, ltp, change },
      });
    } else {
      navigate("/stocks"); // Go back to the previous page
    }
  };

  return (
    <nav className={`bg-[#4f46e5] p-3 ${!isStockPage && "rounded-lg"}`}>
      <div
        className={`container mx-auto flex justify-between items-center ${
          isStockPage && "my-1"
        }`}
      >
        <div className="flex">
          {isStockPage && (
            <img
              src="/icon.ico"
              alt="TradeSphere Logo"
              className="mr-5 w-12 h-12"
            />
          )}
          <h1
            className={`text-white ${
              isStockPage || isAnalysisPage ? "text-4xl" : "text-3xl"
            } font-bold`}
          >
            {isStockPage || isAnalysisPage ? "TradeSphere" : "Dashboard"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* Conditional "Dashboard" and "Stocks" links when on the stock page */}
          {isStockPage && (
            <>
              <div
                className="relative"
                onMouseEnter={() => setShowBack(true)}
                onMouseLeave={() => setShowBack(false)}
              >
                <button
                  onClick={handleBackClick}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
                >
                  <i className="fas fa-arrow-left text-xl text-gray-700"></i>
                </button>

                {showBack && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                    <p className="text-white text-sm">Back</p>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowDashboard(true)}
                onMouseLeave={() => setShowDashboard(false)}
              >
                <Link to="/dashboard">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
                    <i className="fas fa-tachometer-alt text-xl text-gray-700"></i>
                  </button>
                </Link>
                {showDashboard && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                    <p className="text-white text-sm">Dashboard</p>
                  </div>
                )}
              </div>

              <div
                className="relative"
                onMouseEnter={() => setShowStocks(true)}
                onMouseLeave={() => setShowStocks(false)}
              >
                <Link to="/stocks">
                  <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
                    <i className="fas fa-chart-line text-xl text-gray-700"></i>
                  </button>
                </Link>
                {showStocks && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                    <p className="text-white text-sm">All Stocks</p>
                  </div>
                )}
              </div>
            </>
          )}

          <div
            className="relative"
            onMouseEnter={() => setShowContacts(true)}
            onMouseLeave={() => setShowContacts(false)}
          >
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
              <i className="fas fa-address-book text-xl text-gray-700"></i>
            </button>
            {showContacts && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                <p className="text-white text-sm">Contacts</p>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setShowNotifications(true)}
            onMouseLeave={() => setShowNotifications(false)}
          >
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
              <i className="fas fa-bell text-xl text-gray-700"></i>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                <p className="text-white text-sm">Notifications</p>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              onMouseEnter={() => setShowAcc(true)}
              onMouseLeave={() => setShowAcc(false)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
            >
              <i className="fas fa-user text-xl text-gray-700"></i>
            </button>
            {showAcc && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-36 text-center bg-gray-800 rounded-md shadow-lg">
                <p className="text-white text-sm">Account</p>
              </div>
            )}
            {isOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                <hr />
                <div className="py-2">
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-cog mr-2"></i> Settings
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-user mr-2"></i> Profile
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
