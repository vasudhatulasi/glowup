import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"; // Login page
import Home from "./Home";
import SkinCare from "./SkinCare";
import SkinResult from "./SkinResult";
import HairCare from "./HairCare";
import HairResult from "./HairResult";
import BodyCare from "./BodyCare";
import BodyResult from "./BodyResult";
import Signup from "./Signup"; // Signup page
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Login page */}
          <Route path="/" element={<Login/>} />
          
          {/* Signup page */}
          <Route path="/signup" element={<Signup />} />
          
          {/* After login */}
          <Route path="/home" element={<Home />} />
          
          {/* Other routes */}
          <Route path="/skin-care" element={<SkinCare />} />
          <Route path="/skin-result" element={<SkinResult />} />
          <Route path="/hair-care" element={<HairCare />} />
          <Route path="/hair-result" element={<HairResult />} />
          <Route path="/body-care" element={<BodyCare />} />
          <Route path="/body-result" element={<BodyResult />} />
        </Routes>
      </div>
    </Router>
  );
}
