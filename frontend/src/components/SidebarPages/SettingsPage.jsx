import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Toggle from "../Buttons/Toggle";

const SettingsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
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
                <div className="mb-4">
                  <label
                    className="block mb-2 text-gray-700"
                    htmlFor="current-password"
                  >
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-gray-700"
                    htmlFor="new-password"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-gray-700"
                    htmlFor="confirm-password"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Update Password
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
