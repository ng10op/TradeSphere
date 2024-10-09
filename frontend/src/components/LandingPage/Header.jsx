import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header" className="relative overflow-hidden bg-gray-200 mt-3">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('../images/hero_img.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className="relative flex items-center justify-center h-screen text-center text-white">
        <div className="container mx-auto px-4">
          <div className="py-20">
            <h1 className="text-7xl md:text-8xl font-bold mb-4">
              Welcome to TradeSphere
              <span className="text-blue-400 font-extrabold"></span>
            </h1>
            <h3 className="text-3xl md:text-4xl">
              Empower Your Investment Decisions with Real-Time Insights
            </h3>
            <p className="text-xl md:text-2xl font-light mb-12">
              Stay ahead of the market with our cutting-edge stock analysis
              tools. Analyze, compare, and make informed decisions with the
              latest data and trends.
            </p>
            <Link
              to="/auth"
              className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 no-underline"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
