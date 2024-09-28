import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullPage from "./components/LandingPage/FullPage";
import UserAuth from "./components/Auth/UserAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import Stocks from "./components/Stock/Stocks";
import Support from "./components/Support/Support";
import ProfilePage from "./components/SidebarPages/ProfilePage";
import SettingsPage from "./components/SidebarPages/SettingsPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import LogoutPage from "./components/SidebarPages/LogoutPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<FullPage />} />
          <Route path="/auth" element={<UserAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
