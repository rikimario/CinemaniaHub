const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();

//* middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  const allowedOrigins = [
    "https://cinema-hub-marios-projects-624972af.vercel.app",
    "https://cinema-2ot2hrs51-marios-projects-624972af.vercel.app",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", require("./routes/authRoutes"));

// * database connection //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
