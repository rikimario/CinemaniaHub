const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT;

const app = express();

//* middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://cinemania-hub-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/", require("./routes/authRoutes"));
app.use("/", (req, res) => {
  res.send("hello");
});

// * database connection //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
