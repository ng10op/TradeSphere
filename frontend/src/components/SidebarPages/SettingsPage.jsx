import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Sidebar from "../SideBar/Sidebar";
import Toggle from "../Buttons/Toggle";

const SettingsPage = () => {
  const { user, changePassword } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [nse, setNse] = useState(true);
  const [bse, setBse] = useState(true);
  const [mf, setMf] = useState(false);
  const [fno, setFno] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNotificationsChange = () => {
    setNotifications(!notifications);
  };

  const handleEmailNotificationsChange = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleSmsNotificationsChange = () => {
    setSmsNotifications(!smsNotifications);
  };

  const handleNSE = () => {
    setNse(!nse);
  };

  const handleBSE = () => {
    setBse(!bse);
  };

  const handleMF = () => {
    setMf(!mf);
  };

  const handleFNO = () => {
    setFno(!fno);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validatePassword(newPassword)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      await changePassword({
        email: user.email,
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Settings
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Customize your preferences and account settings.
              </p>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-2xl font-semibold text-black">
                Update Password
              </h3>
              <hr className="my-6 border-gray-700" />
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-gray-800 font-medium"
                    htmlFor="current-password"
                  >
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-gray-800 font-medium"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-gray-800 font-medium"
                    htmlFor="confirm-password"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-40 px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
              </form>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-2xl font-semibold text-black">
                Notification Settings
              </h3>
              <hr className="my-6 border-gray-700" />
              <Toggle
                label="Email Notifications"
                checked={notifications}
                onChange={handleNotificationsChange}
              />
              <Toggle
                label="Market Updates"
                checked={emailNotifications}
                onChange={handleEmailNotificationsChange}
              />
              <Toggle
                label="Weekly Summary"
                checked={smsNotifications}
                onChange={handleSmsNotificationsChange}
              />
            </div>
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-2xl font-semibold text-black">
                Trading Prefernce
              </h3>
              <hr className="my-6 border-gray-700" />
              <Toggle label="NSE" checked={nse} onChange={handleNSE} />
              <Toggle label="BSE" checked={bse} onChange={handleBSE} />
              <Toggle label="Mutual Funds" checked={mf} onChange={handleMF} />
              <Toggle
                label="Future and Options"
                checked={fno}
                onChange={handleFNO}
              />
            </div>
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-2xl font-semibold text-black">
                Active Devices
              </h3>
              <hr className="my-6 border-gray-700" />
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="rounded-full bg-gray-200 p-3 mr-3">
                    <i className="fas fa-laptop text-xl text-blue-500"></i>
                  </div>
                  <span className="text-lg font-medium">Chrome on Windows</span>
                  <span className="ml-auto text-sm text-green-500">
                    Active now
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gray-200 p-3 mr-3">
                    <i className="fas fa-mobile-alt text-xl text-blue-500"></i>
                  </div>
                  <span className="text-lg font-medium">iPhone</span>
                  <span className="ml-auto text-sm text-gray-500">
                    Last active 2 hours ago
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
