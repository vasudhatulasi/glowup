import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // ✅ import your axios instance

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // ✅ No need to include /api in the path, since baseURL already has it
      await api.post("/signup", { username, password });
      alert("Signup Successful 🎉");
      navigate("/"); // redirect to login
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup Failed. Try again.");
    }
  };

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(120deg, #ff9a9e, #fad0c4, #fcb69f)",
      backgroundSize: "200% 200%",
      animation: "gradientShift 6s ease infinite",
    },
    card: {
      background: "rgba(255, 255, 255, 0.95)",
      padding: "35px",
      width: "350px",
      borderRadius: "20px",
      textAlign: "center",
      boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.2)",
      animation: "fadeIn 0.7s ease",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "10px",
    },
    subtitle: { fontSize: "14px", color: "#666", marginBottom: "20px" },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "10px",
      border: "1px solid #ddd",
      outline: "none",
      fontSize: "15px",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "12px",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      color: "white",
      background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    switchText: { marginTop: "15px", fontSize: "14px" },
    switchSpan: { color: "#ff416c", fontWeight: "bold", cursor: "pointer", transition: "0.3s" },
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift { 0% { background-position:0% 50%; } 100% { background-position:100% 50%; } }
          @keyframes fadeIn { from { opacity:0; transform:translateY(-15px); } to { opacity:1; transform:translateY(0); } }
          input:focus { border-color: #ff416c; box-shadow: 0 0 10px rgba(255, 65, 108, 0.3); }
          button:hover { transform: scale(1.05); box-shadow: 0 10px 20px rgba(255, 65, 108, 0.4); }
          span:hover { text-decoration: underline; }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account ✨</h2>
          <p style={styles.subtitle}>Sign up to start your GlowUp journey</p>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button style={styles.button}>Sign Up</button>
          </form>
          <p style={styles.switchText}>
            Already have an account?{" "}
            <span style={styles.switchSpan} onClick={() => navigate("/")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
