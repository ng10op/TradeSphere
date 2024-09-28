import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./UserAuth.css";

const UserAuth = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);
  const [emailL, setEmailL] = useState("");
  const [passwordL, setPasswordL] = useState("");
  const [name, setName] = useState("");
  const [emailS, setEmailS] = useState("");
  const [passwordS, setPasswordS] = useState("");
  const [cnfmPasswordS, setCnfmPasswordS] = useState("");
  let username;

  //   const saveLocal = (email, role, name) => {
  //     localStorage.setItem("user", JSON.stringify(email));
  //     localStorage.setItem("role", JSON.stringify(role));
  //     localStorage.setItem("name", JSON.stringify(name));
  //   };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     const response = await fetch("/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ emailId: emailL, password: passwordL }),
  //     });
  //     const json = await response.json();
  //     if (!response.ok) {
  //       console.log(json.message);
  //       alert("Invalid login credentials");
  //       return;
  //     }
  //     username = json.user.userName;
  //     const role = json.user.role;
  //     console.log(json);
  //     saveLocal(emailL, role, username);
  //     if (response.ok) {
  //       window.location.reload();
  //     }
  //   };

  //   const handleSignUp = async (e) => {
  //     e.preventDefault();
  //     const response = await fetch("/auth/new", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userName: name,
  //         emailId: emailS,
  //         password: passwordS,
  //         role: role,
  //       }),
  //     });
  //     const json = await response.json();
  //     if (!response.ok) {
  //       console.log(json.message);
  //     }
  //     saveLocal(emailS, role, name);
  //     if (response.ok) {
  //       window.location.reload();
  //     }
  //   };

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
                id="email"
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
              <button className="Button">Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="Form" action="#">
              <h1 className="font-bold m-3 text-3xl">Login</h1>
              <input
                onChange={(e) => setEmailL(e.target.value)}
                className="Input"
                type="email"
                id="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPasswordL(e.target.value)}
                className="Input"
                type="password"
                placeholder="Password"
              />
              <button className="Button">Sign In</button>
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
            to="/dashboard"
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
