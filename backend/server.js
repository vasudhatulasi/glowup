// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

/* ================================================================
   🌸 DATABASE CONNECTION
================================================================ */
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb+srv://vasudhatulasi4_db_user:OD6LMySyBuKG5Gyz@cluster0.mdnftle.mongodb.net/glowup",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* ================================================================
   🧴 SKINCARE COLLECTION
================================================================ */
const skinSchema = new mongoose.Schema({
  skinType: String,
  ingredientsToUse: [String],
  routine: Object,
  foodHabits: Object,
  fruitsAndRemedies: Object,
  lifestyleTips: String,
  concerns: String,
});
const Skin = mongoose.model("skins", skinSchema);

app.get("/skin/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const data = await Skin.findOne({ skinType: type });
    if (!data) return res.status(404).json({ message: "No skincare data found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================================================
   💇 HAIRCARE COLLECTION
================================================================ */
const hairSchema = new mongoose.Schema({
  hairType: String,
  ingredientsToUse: [String],
  routine: Object,
  foodHabits: Object,
  fruitsAndRemedies: Object,
  lifestyleTips: String,
  concerns: String,
});
const Hair = mongoose.model("hairs", hairSchema);

app.get("/hair/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const data = await Hair.findOne({ hairType: type });
    if (!data) return res.status(404).json({ message: "No haircare data found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================================================
   💪 BODYCARE COLLECTION
================================================================ */
const bodySchema = new mongoose.Schema({
  goal: String,
  description: String,
  recommendedWorkouts: [String],
  dietPlan: Object,
  foodHabits: Object,
  lifestyleTips: [String],
  homeRemedies: [String],
  motivation: String,
});
const Body = mongoose.model("bodies", bodySchema);

app.get("/body/:goal", async (req, res) => {
  try {
    const goal = req.params.goal;
    const data = await Body.findOne({ goal });
    if (!data) return res.status(404).json({ message: "No bodycare data found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================================================
   👤 USER LOGIN & SIGNUP
================================================================ */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("users", userSchema);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.json({ message: "User already exists" });

  const newUser = await User.create({ username, password });
  res.json({ message: "User registered successfully", user: newUser });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, "sectiona", { expiresIn: "1h" });
  res.json({ message: "Access granted", token });
});

/* ================================================================
   🔐 TOKEN VERIFY
================================================================ */
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, "sectiona");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

/* ================================================================
   🧠 TEST ROUTE
================================================================ */
app.get("/", (req, res) => {
  res.send("✨ GlowUp API running — connected to MongoDB!");
});

/* ================================================================
   🚀 SERVER LISTEN
================================================================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
