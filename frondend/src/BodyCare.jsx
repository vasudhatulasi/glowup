import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BodyCare() {
  const [goal, setGoal] = useState("");
  const [weight, setWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [eating, setEating] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal) return alert("Please select your fitness goal");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/body/${encodeURIComponent(goal)}`
      );
      navigate("/body-result", { state: { data: response.data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Data not found or server error");
    }
  };

  return (
    <div className="questionnaire" style={{ padding: "30px", textAlign: "center" }}>
      <h1 style={{ color: "#ff6ea1" }}>💪 Weight & Fitness Questionnaire</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
        {/* Select Goal */}
        <label>What is your current goal?</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <option value="">-- Choose --</option>
          <option value="Lose Weight">Lose Weight</option>
          <option value="Gain Muscle">Gain Muscle</option>
          <option value="Maintain Weight">Maintain Weight</option>
          <option value="Improve Stamina">Improve Stamina</option>
        </select>

        {/* Current Weight */}
        <label>Current Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="e.g., 70"
          style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "8px" }}
        />

        {/* Target Weight */}
        <label>Target Weight (kg):</label>
        <input
          type="number"
          value={targetWeight}
          onChange={(e) => setTargetWeight(e.target.value)}
          placeholder="e.g., 60"
          style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "8px" }}
        />

        {/* Activity Routine */}
        <label>Describe your physical activity routine:</label>
        <textarea
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="e.g., walking, gym workouts, yoga, sports"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        {/* Eating Habits */}
        <label>Describe your eating habits:</label>
        <textarea
          value={eating}
          onChange={(e) => setEating(e.target.value)}
          placeholder="e.g., vegetarian, high-protein, intermittent fasting"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#ff6ea1",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
