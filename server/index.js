const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/cinema-hub");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.json("Success");
        } else {
          res.json("Email or Password is incorrect");
        }
      });
    } else {
      res.json('User don"t exist');
    }
  });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.json(err);
    } else {
      User.create({ username: username, email: email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
