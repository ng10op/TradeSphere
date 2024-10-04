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
import PrivateRoute from "./components/Auth/PrivateRoute";
import { AuthProvider } from "./components/Auth/AuthContext";

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
    <AuthProvider>
      {" "}
      <Router>
        <div className="content">
          {loading ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/" element={<FullPage />} />
              <Route path="/auth" element={<UserAuth />} />

              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stocks"
                element={
                  <PrivateRoute>
                    <Stocks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <PrivateRoute>
                    <Support />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <PrivateRoute>
                    <LogoutPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stock/:id"
                element={
                  <PrivateRoute>
                    <IndividualStock />
                  </PrivateRoute>
                }
              />
              <Route
                path="/stock-analysis/:id"
                element={
                  <PrivateRoute>
                    <StockAnalysis />
                  </PrivateRoute>
                }
              />
            </Routes>
          )}
          <ScrollToTopButton />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
