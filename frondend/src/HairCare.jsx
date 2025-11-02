import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HairCare() {
  const [hairType, setHairType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hairType) return alert("Please select your hair type");

    try {
      const response = await axios.get(`http://localhost:5000/api/hair/${hairType}`);

      // Navigate to result page and pass data
      navigate("/hair-result", { state: { data: response.data } });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Data not found or server error");
    }
  };

  return (
    <div className="questionnaire" style={{ padding: "20px" }}>
      <h1>💆‍♀️ Hair Care Questionnaire</h1>

      <form onSubmit={handleSubmit}>
        <label>Select your hair type:</label>
        <select value={hairType} onChange={(e) => setHairType(e.target.value)}>
          <option value="">-- Choose --</option>
          <option value="Straight">Straight</option>
          <option value="Wavy">Wavy</option>
          <option value="Curly">Curly</option>
        </select>

        <br /><br />
        <label>Describe your daily hair routine:</label>
        <textarea placeholder="e.g., wash daily, use heat styling, oiling, etc." />

        <label>Share your hair concerns:</label>
        <textarea placeholder="e.g., frizz, dandruff, hair fall" />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
