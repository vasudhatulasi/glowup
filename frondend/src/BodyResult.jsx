import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BodyResult() {
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

      <h1 style={styles.title}>💪 Body & Fitness Plan for {data.goal}</h1>

      <div style={styles.cardContainer}>
        {/* Workout Plan */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🏋️ Recommended Workouts</h3>
          <ul>
            {data.recommendedWorkouts?.map((w, i) => (
              <li key={i} style={styles.listItem}>
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Diet Plan */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🥗 Diet Plan</h3>
          {Object.entries(data.dietPlan || {}).map(([meal, plan]) => (
            <p key={meal}>
              <b>{meal}:</b> {plan}
            </p>
          ))}
        </div>

        {/* Food Habits */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🍎 Food Habits</h3>
          <p>
            <b>Eat:</b> {data.foodHabits?.eat?.join(", ")}
          </p>
          <p>
            <b>Avoid:</b> {data.foodHabits?.avoid?.join(", ")}
          </p>
        </div>

        {/* Lifestyle Tips */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>🌞 Lifestyle Tips</h3>
          <ul>
            {data.lifestyleTips?.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Motivational Notes */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>💡 Motivation</h3>
          <p>{data.motivation}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#fff6e9",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  },
  title: {
    color: "#ff7043",
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
    transition: "transform 0.2s ease, boxShadow 0.2s ease",
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
    backgroundColor: "#ff7043",
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
    backgroundColor: "#fff3e0",
    height: "100vh",
  },
};
