const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

//* middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.cookie("token", token, {
//     sameSite: "None",
//     secure: true,
//     httpOnly: true,
//   });
//   next();
// });

app.use(
  cors({
    origin: "https://cinemania-hub-frontend.vercel.app",
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use("/", require("./routes/authRoutes"));
app.use("/", (req, res) => {
  res.send("hello");
});

// * production mode
// if (process.env.NODE_ENV === "production") {
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, "./dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "dist", "index.html"));
//   });
// }

// * database connection //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
