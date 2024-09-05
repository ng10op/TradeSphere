import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, []);

  return (
    <div className="fixed-nav-padding">
      <nav className="fixed-nav py-3">
        <div className="container mx-auto flex justify-between items-center">
          <img
            src="/icon.ico"
            alt="TradeSphere Logo"
            className="mr-2"
            style={{ width: "40px", height: "40px" }}
          />
          <Link
            to="/"
            className="text-4xl font-bold text-gray-800 uppercase no-underline"
          >
            TradeSphere
          </Link>

          <ul className="flex space-x-12 ulItems">
            <li>
              <a
                className={`nav-link ${
                  activeSection === "features" ? "active" : ""
                }`}
                href="#features"
                onClick={handleScroll}
              >
                Features
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${
                  activeSection === "about" ? "active" : ""
                }`}
                href="#about"
                onClick={handleScroll}
              >
                About
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${
                  activeSection === "services" ? "active" : ""
                }`}
                href="#services"
                onClick={handleScroll}
              >
                Services
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${
                  activeSection === "about" ? "active" : ""
                }`}
                href="#testimonials"
                onClick={handleScroll}
              >
                Tesimonials
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${
                  activeSection === "team" ? "active" : ""
                }`}
                href="#team"
                onClick={handleScroll}
              >
                Team
              </a>
            </li>
            <li>
              <a
                className={`nav-link ${
                  activeSection === "contact" ? "active" : ""
                }`}
                href="#contact"
                onClick={handleScroll}
              >
                Contact
              </a>
            </li>
            <li>
              <Link className="nav-link" to="/auth">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
