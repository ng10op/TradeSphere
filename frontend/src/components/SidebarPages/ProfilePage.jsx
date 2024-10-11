import React, { useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import { useAuth } from "../Context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formattedCreatedAt = user?.createdAt ? formatDate(user.createdAt) : "";
  const formattedLastLogin = user?.prevLogin
    ? formatDate(user.prevLogin)
    : formatDate(user.currLogin);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                User Profile
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Manage your personal information and preferences.
              </p>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                Profile Summary
              </h3>
              <div className="mt-4">
                <p className="text-gray-700 text-lg">
                  <strong>Name:</strong> {user.name}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Joined:</strong> {formattedCreatedAt}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                User Activity
              </h3>
              <ul className="mt-4">
                <li className="text-gray-700 text-lg">
                  <strong>Traded:</strong> ADANIENT, INFY, KOTAKBANK
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Last login:</strong> {formattedLastLogin}
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Invested in:</strong> 3 different sectors
                </li>
              </ul>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                Investment Summary
              </h3>
              <ul className="mt-4">
                <li className="text-gray-700 text-lg">
                  <strong>Total Stocks Owned:</strong> 15
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Portfolio Value:</strong> ₹2,50,000
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Profit/Loss:</strong> +₹30,000 (12%)
                </li>
              </ul>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">Watchlist</h3>
              <ul className="mt-4">
                <li className="text-gray-700 text-lg">TCS</li>
                <li className="text-gray-700 text-lg">RELIANCE</li>
                <li className="text-gray-700 text-lg">ITC</li>
              </ul>
            </div>

            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                Recent Transactions
              </h3>
              <ul className="mt-4">
                <li className="text-gray-700 text-lg">
                  <strong>Buy:</strong> INFY - 20 shares at ₹1,800
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Sell:</strong> ADANIENT - 10 shares at ₹2,300
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
