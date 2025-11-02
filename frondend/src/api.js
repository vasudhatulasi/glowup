import axios from "axios";

const api = axios.create({
  baseURL: "https://glowup-4.onrender.com/", // ✅ no /api here
});

export default api;