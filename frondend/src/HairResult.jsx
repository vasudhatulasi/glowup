import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HairResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return (
      <div style={styles.container}>
        <h2>No data found 😕</h2>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <button style={styles.backButton} onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h1 style={styles.title}>💇‍♀️ Haircare Recommendations for {data.hairType}</h1>

      <div style={styles.cardContainer}>
        {/* Ingredients */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🧴 Ingredients to Use</h3>
          <ul>
            {data.ingredientsToUse?.map((ing, i) => (
              <li key={i} style={styles.listItem}>{ing}</li>
            ))}
          </ul>
        </div>

        {/* Routine */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🪮 Haircare Routine</h3>
          <ul>
            {Object.entries(data.routine || {}).map(([step, desc]) => (
              <li key={step} style={styles.listItem}>
                <b>{step}:</b> {desc}
              </li>
            ))}
          </ul>
        </div>

        {/* Food Habits */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🍎 Food Habits</h3>
          <p><b>Eat:</b> {data.foodHabits?.eat?.join(", ")}</p>
          <p><b>Avoid:</b> {data.foodHabits?.avoid?.join(", ")}</p>
        </div>

        {/* Fruits & Remedies */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🍋 Fruits & Home Remedies</h3>
          <p><b>Fruits:</b> {data.fruitsAndRemedies?.fruitsAndJuices?.join(", ")}</p>
          <ul>
            {data.fruitsAndRemedies?.homeRemedies?.map((r, i) => (
              <li key={i} style={styles.listItem}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Lifestyle Tips */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>💆 Lifestyle Tips</h3>
          <p>{data.lifestyleTips}</p>
        </div>

        {/* Concerns */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>⚠️ Concerns</h3>
          <p>{data.concerns}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#e8f8f5",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#009688",
    fontSize: "2rem",
    marginBottom: "30px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
    justifyContent: "center",
    alignItems: "stretch",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "left",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  sectionTitle: {
    color: "#ff9800",
    marginBottom: "10px",
  },
  listItem: {
    lineHeight: "1.6",
    marginBottom: "5px",
  },
  backButton: {
    backgroundColor: "#004d40",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
  },
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#e0f2f1",
    height: "100vh",
  },
};
