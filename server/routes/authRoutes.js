const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authControllers");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", getProfile);

module.exports = router;
