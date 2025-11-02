import React from "react";
import { useNavigate } from "react-router-dom";

export default function SectionCard(props) {
  const navigate = useNavigate();

  return (
    <div
      id={props.id}
      style={{
        background: props.bg || "white",
        color: props.textColor || "#333333",
        borderRadius: "12px",
        padding: "20px",
        flex: "1",
        minWidth: "250px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={props.img}
        alt={props.title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      />
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
      <button
        style={{
          background: props.textColor,
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px",
        }}
        onClick={() => navigate(props.link)}
      >
        Explore →
      </button>
    </div>
  );
}
