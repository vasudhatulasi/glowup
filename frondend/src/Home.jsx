import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <div className="page">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Dashboard */}
      <section id="dashboard" className="container hero">
        <h1 className="brand">GlowUp</h1>
        <p className="tagline">Your all-in-one beauty and self-care guide</p>
        <Dashboard />
      </section>

      {/* Footer */}
      <footer className="footer">
        © {new Date().getFullYear()} GlowUp. All rights reserved.
      </footer>
    </div>
  );
}
