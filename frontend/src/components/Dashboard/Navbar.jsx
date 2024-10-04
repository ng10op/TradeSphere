import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#4f46e5] p-3 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">TradeSphere Dashboard</h1>
        <div className="flex items-center space-x-4">
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
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200"
            >
              <i className="fas fa-user text-xl text-gray-700"></i>
            </button>
            {isOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg z-20">
                <div className="px-4 py-2 border-b">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                <hr />
                <div className="py-2">
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-cog mr-2"></i> Settings
                  </a>
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-user mr-2"></i> Profile
                  </a>
                  <a
                    href="/logout"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                  </a>
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
