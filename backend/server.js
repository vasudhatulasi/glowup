const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs"); // ✅ Added to read JSON files

const app = express();
app.use(express.json());
app.use(cors());

/* ================================================================
   🌸 DATABASE CONNECTION
================================================================ */
mongoose
  .connect("mongodb://127.0.0.1:27017/glowup", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected via Compass"))
  .catch((err) => console.log(err));

/* ================================================================
   📂 LOAD LOCAL JSON FILES (for fallback if DB empty)
================================================================ */
const skinData = JSON.parse(fs.readFileSync("./data/glowup.skins.json", "utf-8"));
const hairData = JSON.parse(fs.readFileSync("./data/glowup.hairs.json", "utf-8"));
const bodyData = JSON.parse(fs.readFileSync("./data/glowup.bodies.json", "utf-8"));

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

app.get("/api/skin/:type", async (req, res) => {
  try {
    const type = req.params.type;
    let data = await Skin.findOne({ skinType: type });

    // ✅ Use local JSON data if DB has no record
    if (!data) data = skinData.find((s) => s.skinType.toLowerCase() === type.toLowerCase());
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

app.get("/api/hair/:type", async (req, res) => {
  try {
    const type = req.params.type;
    let data = await Hair.findOne({ hairType: type });

    // ✅ Fallback to JSON if MongoDB has no data
    if (!data) data = hairData.find((h) => h.hairType.toLowerCase() === type.toLowerCase());
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

app.get("/api/body/:goal", async (req, res) => {
  try {
    const goal = req.params.goal;
    let data = await Body.findOne({ goal });

    // ✅ Fallback to JSON if MongoDB empty
    if (!data) data = bodyData.find((b) => b.goal.toLowerCase() === goal.toLowerCase());
    if (!data) return res.status(404).json({ message: "No bodycare data found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================================================================
   👤 USER LOGIN & SIGNUP (same code, no change)
================================================================ */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
let usermodel = mongoose.model("user", userSchema);

app.post("/signup", async (req, res) => {
  let { username, password } = req.body;
  let existinguser = (await usermodel.findOne({ username })) || {};
  if (existinguser.username == username) {
    res.json({ message: "user already exists" });
  } else {
    let newuser = await usermodel.create({ username, password });
    res.json({ message: "user registered successfully", user: newuser });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await usermodel.findOne({ username });

  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.password !== password) return res.status(401).json({ message: "Invalid password" });

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
  res.json({ message: "access granted", user: req.user });
});

/* ================================================================
   🧠 TEST ROUTE & SERVER
================================================================ */
app.get("/", (req, res) => {
  res.send("✨ GlowUp API running — Skin, Hair, and Body collections active!");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
