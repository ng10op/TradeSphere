import React, { useEffect } from "react";
import Sidebar from "../Sidebar"; // Adjust the path as necessary

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate the last login date (1 day before the current date)
  const lastLoginDate = new Date();
  lastLoginDate.setDate(lastLoginDate.getDate() - 1); // Subtract 1 day
  const formattedLastLogin = lastLoginDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            {/* Profile Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                User Profile
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                Manage your personal information and preferences.
              </p>
            </div>

            {/* Profile Summary */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                Profile Summary
              </h3>
              <div className="mt-4">
                <p className="text-gray-700 text-lg">
                  <strong>Name:</strong> John Doe
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Email:</strong> johndoe@example.com
                </p>
                <p className="text-gray-700 text-lg">
                  <strong>Joined:</strong> January 15, 2021
                </p>
              </div>
            </div>

            {/* User Activity */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                User Activity
              </h3>
              <ul className="mt-4">
                <li className="text-gray-700 text-lg">
                  <strong>Traded:</strong> ADANIENT, INFY, KOTAKBANK
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Last login:</strong> {formattedLastLogin}{" "}
                  {/* Display the last login date */}
                </li>
                <li className="text-gray-700 text-lg">
                  <strong>Invested in:</strong> 3 different sectors
                </li>
              </ul>
            </div>

            {/* Contact Support Section */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-semibold text-black">
                Contact Support
              </h3>
              <form className="mt-4">
                <div className="flex flex-col mb-4 text-lg">
                  <label className="mb-2 text-gray-700" htmlFor="message">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="resize-none p-2 border border-gray-300 rounded-lg"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
