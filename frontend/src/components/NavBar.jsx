import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 fixed top-0 w-full shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-semibold">
            TradeSphere
          </Link>
        </div>

        <div className="hidden lg:flex space-x-6">
          <Link to="#features" className="text-white hover:text-gray-300">
            Features
          </Link>
          <Link to="#about" className="text-white hover:text-gray-300">
            About
          </Link>
          <Link to="#services" className="text-white hover:text-gray-300">
            Services
          </Link>
          <Link to="#portfolio" className="text-white hover:text-gray-300">
            Gallery
          </Link>
          <Link to="#testimonials" className="text-white hover:text-gray-300">
            Testimonials
          </Link>
          <Link to="#team" className="text-white hover:text-gray-300">
            Team
          </Link>
          <Link to="#contact" className="text-white hover:text-gray-300">
            Contact
          </Link>
          <Link to="/auth" className="text-white hover:text-gray-300">
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
