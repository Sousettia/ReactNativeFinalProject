const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/authController");
const auth = require("../middleware/auth-profile");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getProfile); // Protected route

module.exports = router;