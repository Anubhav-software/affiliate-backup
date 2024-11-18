require("dotenv/config");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig.js");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const User = require("./models/User");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
