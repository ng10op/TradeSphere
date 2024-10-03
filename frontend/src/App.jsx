import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullPage from "./components/LandingPage/FullPage";
import UserAuth from "./components/Auth/UserAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import Stocks from "./components/Stock/Stocks";
import Support from "./components/Support/Support";
import ProfilePage from "./components/SidebarPages/ProfilePage";
import SettingsPage from "./components/SidebarPages/SettingsPage";
import LogoutPage from "./components/SidebarPages/LogoutPage";
import IndividualStock from "./components/Stock/IndividualStock";
import StockAnalysis from "./components/Stock/StockAnalysis";
import Loader from "./components/Loader/Loader";
import ScrollToTopButton from "./components/ScrollToTopButton";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Router>
      <div className="content">
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<FullPage />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/stock/:id" element={<IndividualStock />} />
            <Route path="/stock-analysis/:id" element={<StockAnalysis />} />
          </Routes>
        )}
        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
