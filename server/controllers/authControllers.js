const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helpers/auth");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.json({ error: "username is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and it must be least 6 characters",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        },
      );
    }
    if (!match) {
      return res.json({
        error: "password do not match!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json();
  }
};

const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully", success: true });
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
};
