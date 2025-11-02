import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <h2>GlowUp</h2>
      <div style={navLinksStyle}>
        <Link to="/home">Home</Link>
        <Link to="/skin-care">Skin</Link>
        <Link to="/hair-care">Hair</Link>
        <Link to="/body-care">Body</Link>
        <Logout />
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#2c3e50",
  color: "white",
};

const navLinksStyle = {
  display: "flex",
  gap: "20px", // <-- space between links and Logout
  alignItems: "center",
};
