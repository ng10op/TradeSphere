// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const PrivateRoute = ({ children, role }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If the user is not logged in, navigate to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, navigate to dashboard
  return <Navigate to="/dashboard" />;
};

export default PrivateRoute;

// import PrivateRoute from "./PrivateRoute";

// <Routes>
//   <Route path="/" element={<HomePage />} />
//   <Route path="/login" element={<LoginPage />} />

//   {/* Protect the dashboard route */}
//   <Route
//     path="/dashboard"
//     element={<PrivateRoute><DashboardPage /></PrivateRoute>}
//   />
// </Routes>
