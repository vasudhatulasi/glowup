import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SkinCare() {
  const [skinType, setSkinType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skinType) return alert("Please select your skin type");

    try {
      const response = await axios.get(`http://localhost:5000/api/skin/${skinType}`);

      // Navigate to result page and pass data
      navigate("/skin-result", { state: { data: response.data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Data not found or server error");
    }
  };

  return (
    <div className="questionnaire" style={{ padding: "20px" }}>
      <h1>🌿 Skin Care Questionnaire</h1>

      <form onSubmit={handleSubmit}>
        <label>Select your skin type:</label>
        <select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
          <option value="">-- Choose --</option>
          <option value="Acne-Prone">Acne-Prone</option>
          <option value="Dry">Dry</option>
          <option value="Oily">Oily</option>
          <option value="Combination">Combination</option>
          <option value="Sensitive">Sensitive</option>
        </select>

        <br /><br />
        <label>Describe your lifestyle:</label>
      <textarea placeholder="e.g., active, sedentary, stressful, etc." />

      <label>Share your skin concerns:</label>
      <textarea placeholder="e.g., acne, redness, dryness" />
      <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
