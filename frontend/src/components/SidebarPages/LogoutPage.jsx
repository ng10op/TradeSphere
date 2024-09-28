import React from "react";
import Sidebar from "../Sidebar"; // Adjust the path as necessary

const LogoutPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            {/* Logout Confirmation */}
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Successfully Logged Out
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                You have been successfully logged out of your account.
              </p>
              <p className="mt-4 text-gray-600">
                Thank you for using TradeSphere! If you need to log back in,
                click the button below.
              </p>
              <button className="mt-6 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200">
                Go to Login
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LogoutPage;
