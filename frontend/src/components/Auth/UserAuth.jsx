import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./UserAuth.css";

const UserAuth = () => {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailL, setEmailL] = useState("");
  const [passwordL, setPasswordL] = useState("");
  const [name, setName] = useState("");
  const [emailS, setEmailS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [cnfmPasswordS, setCnfmPasswordS] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(emailL)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(passwordL)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const data = await login({ email: emailL, password: passwordL });
    if (data) {
      navigate("/dashboard");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    if (!validateEmail(emailS)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(passwordS)) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (passwordS !== cnfmPasswordS) {
      alert("Passwords do not match.");
      return;
    }

    const data = await signup({
      name: name,
      email: emailS,
      password: passwordS,
    });
    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="Body">
        <h2 className="text-center text-3xl mb-4">
          <span className="block font-bold text-indigo-700 xl:inline">
            TradeSphere
          </span>{" "}
          User Authentication
        </h2>
        <div
          className={`container ${isSignUp ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form className="Form" action="#">
              <h1 className="font-bold m-3 text-3xl">Create Account</h1>
              <input
                onChange={(e) => setName(e.target.value)}
                className="Input"
                type="text"
                placeholder="Name"
              />
              <input
                onChange={(e) => setEmailS(e.target.value)}
                className="Input"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPasswordS(e.target.value)}
                className="Input"
                type="password"
                placeholder="Password"
              />
              <input
                onChange={(e) => setCnfmPasswordS(e.target.value)}
                className="Input"
                type="password"
                placeholder="Confirm Password"
              />
              <button className="Button" onClick={handleSignUp}>
                Sign Up
              </button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="Form" action="#">
              <h1 className="font-bold m-3 text-3xl">Login</h1>
              <input
                onChange={(e) => setEmailL(e.target.value)}
                className="Input"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPasswordL(e.target.value)}
                className="Input"
                type="password"
                placeholder="Password"
              />
              <button className="Button" onClick={handleLogin}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="font-bold m-3 text-3xl">Welcome Back!</h1>
                <p>
                  To stay connected with us, please login using your personal
                  information.
                </p>
                <button className="Button ghost" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="font-bold m-3 text-3xl">Join Us!</h1>
                <p>
                  Enter your personal details to begin interacting with our
                  system.
                </p>
                <button className="Button ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 text-lg font-semibold text-white rounded-full no-underline Button"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserAuth;
