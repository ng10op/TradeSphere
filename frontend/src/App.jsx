import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullPage from "./components/LandingPage/FullPage";
import UserAuth from "./components/Auth/UserAuth";
import ScrollToTopButton from "./components/ScrollToTopButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  // const location = useLocation();
  // const isHomePage = location.pathname === "/";
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<FullPage />} />
          <Route path="/auth" element={<UserAuth />} />
        </Routes>
        <ScrollToTopButton />
        {/* {isHomePage && <ScrollToTopButton />} */}
      </div>
    </Router>
  );
};

export default App;
