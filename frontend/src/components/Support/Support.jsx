import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import faqData from "./data.json";

const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                We've compiled answers to your most common inquiries to assist
                you in your investment journey.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                  >
                    <span className="flex text-lg font-semibold text-black">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeIndex === index && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
              <h3 className="text-3xl font-bold text-black mb-4">
                Didn't find the answer you are looking for?
              </h3>
              <h4 className="text-xl font-bold text-black mb-4">
                Contact Us Directly!
              </h4>
              <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-md mx-auto space-y-4"
              >
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    rows="4"
                    style={{ resize: "none" }}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Support;
