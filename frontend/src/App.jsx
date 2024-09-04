// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import UserAuth from "./components/UserAuth";

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Link to="/auth">
//           <button>Go to UserAuth</button>
//         </Link>

//         <Routes>
//           <Route path="/auth" element={<UserAuth />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/NavBar";
import UserAuth from "./components/UserAuth";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Routes>
          <Route path="/auth" element={<UserAuth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
