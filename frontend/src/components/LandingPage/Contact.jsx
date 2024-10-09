import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const data = {
  addressLine1: "Floor 2, P.J. Towers, Dalal Street, Fort,",
  addressLine2: "Mumbai - 400001, Maharashtra, India",
  phone: "+91 0123456789",
  email: "tradeshpere@email.com",
  facebook: "/",
  twitter: "/",
  github: "https://github.com/ng10op/TradeSphere",
};

const Contact = () => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    clearState();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        id="contact"
        className="py-24 bg-gradient-to-r from-blue-600 to-blue-400 text-white flex-grow"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold relative inline-block">
              Get in Touch
              <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 bg-blue-300 h-1 w-16 rounded-full mt-2"></span>
            </h2>
            <p className="text-lg mb-8">
              Please fill out the form below to send us an email and we will get
              back to you as soon as possible.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control p-3 border border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
                      placeholder="Name"
                      required
                      value={name || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control p-3 border border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
                      placeholder="Email"
                      required
                      value={email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control p-3 border border-gray-300 rounded-lg resize-none focus:border-gray-600 focus:outline-none"
                    rows="4"
                    placeholder="Message"
                    required
                    value={message || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors rounded-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="text-center md:text-left">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4">CONTACT INFO</h3>
                <p className="mb-2">
                  <span className="block text-white mb-1">
                    <i className="fa fa-map-marker mr-2"></i> Address
                  </span>
                  {data.addressLine1}
                  <br />
                  {data.addressLine2}
                </p>
                <p className="mb-2">
                  <span className="block text-white mb-1">
                    <i className="fa fa-phone mr-2"></i> Phone
                  </span>
                  {data.phone}
                </p>
                <p>
                  <span className="block text-white mb-1">
                    <i className="fa fa-envelope mr-2"></i> Email
                  </span>
                  {data.email}
                </p>
              </div>
              <div className="social mt-12">
                <ul className="flex justify-center md:justify-start space-x-4">
                  <li>
                    <a
                      href={data.facebook}
                      className="text-white hover:text-blue-300 transition-colors no-underline"
                    >
                      <i className="fa-brands fa-facebook text-2xl border-2 border-white w-12 h-12 flex items-center justify-center rounded-full transition-colors"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={data.twitter}
                      className="text-white hover:text-blue-300 transition-colors no-underline"
                    >
                      <i className="fa-brands fa-twitter text-2xl border-2 border-white w-12 h-12 flex items-center justify-center rounded-full transition-colors"></i>
                    </a>
                  </li>

                  <li>
                    <a
                      href={data.github}
                      className="text-white hover:text-blue-300 transition-colors no-underline"
                    >
                      <i className="fa-brands fa-github text-2xl border-2 border-white w-12 h-12 flex items-center justify-center rounded-full transition-colors"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer id="footer" className="bg-gray-200 py-6 text-center">
        <p className="text-gray-600 text-sm">
          &copy; 2024 TradeSphere. All rights reserved. Developed by{" "}
          <a
            href="https://github.com/ng10op"
            className="text-blue-600 hover:underline"
            rel="nofollow"
          >
            Naman Gosain
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Contact;
