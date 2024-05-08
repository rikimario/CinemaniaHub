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
    origin: "https://cinema-hub-phi.vercel.app/",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use("/", require("./routes/authRoutes"));

// * database connection //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
