const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "https://cinema-hub-phi.vercel.app/",
  }),
);

//* middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));

// * database connection //
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not Connected", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
