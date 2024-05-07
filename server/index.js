const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: "https://cinema-hub-phi.vercel.app",
    credentials: true,
  }),
);

// app.options("/login", function (req, res) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://cinema-ki1xsnznb-marios-projects-624972af.vercel.app",
//   );
//   res.header("Access-Control-Allow-Methods", "POST");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   res.sendStatus(200);
// });

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
