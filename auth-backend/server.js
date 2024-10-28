const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/auth", userRoutes);
const planRoutes = require("./routes/planRoutes");
app.use("/api/plans", planRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
