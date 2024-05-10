const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//* middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.cookie(
//     "token",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlvQGFidi5iZyIsImlkIjoiNjYyOTBlOTRmOTE1ZTk4YzMzODRmNjY2IiwidXNlcm5hbWUiOiJtYXJpb19tYXJ0aW5vdiIsImlhdCI6MTcxNTM3MTUyN30.I9hF7v_BwFE_Ksz6yqL9kscMU4WO1KdGWNUUMGbnR34",
//     {
//       sameSite: "None",
//       secure: true,
//       httpOnly: true,
//     },
//   );
//   next();
// });

app.use(
  cors({
    origin: "https://cinemania-hub-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
