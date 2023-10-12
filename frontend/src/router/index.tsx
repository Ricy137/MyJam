import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Navbar from "@modules/Navbar";
import Home from "@pages/Home";

const AppRouter: React.FC = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <main className="relative top-80px flex flex-col w-full items-center">
        <div className="flex flex-col items-center w-full max-w-1440px">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route key="home" path="home" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default AppRouter;
