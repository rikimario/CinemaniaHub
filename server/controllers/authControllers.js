const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helpers/auth");

// * USER CONTROLLER * //
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
        token: generateToken(res, user._id),
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
        error: "Incorrect email or password",
      });
    }

    const match = await comparePassword(password, user.password);
    // if (match) {
    //   return res.json({
    //     _id: user._id,
    //     username: user.username,
    //     email: user.email,
    //     token: generateToken(res, user._id),
    //   });
    // }
    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, {
              sameSite: "none",
              secure: true,
            })
            .json(user);
        },
      );
    }
    if (!match) {
      return res.json({
        error: "Incorrect email or password",
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

// * COLLECTION CONTROLLER * //

//* FAVORITE CONTROLLER
const getFavorite = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.favorite });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
const addToFavorite = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { favorite } = user;
      const movieAlreadyLiked = favorite.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            favorite: [...user.favorite, data],
          },
          { new: true },
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, favorite: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};
const removeFromFavorite = async (req, res) => {
  try {
    const { data } = req.body;
    const { email, movieId } = data;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.favorite;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          favorite: movies,
        },
        { new: true },
      );
      return res.json({ msg: "Successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing from the liked list" });
  }
};

//* WATCHLIST CONTROLLER

const getWatchlist = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.watchlist });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { watchlist } = user;
      const addedToWatchlist = watchlist.find(({ id }) => id === data.id);
      if (!addedToWatchlist) {
        await User.findByIdAndUpdate(
          user._id,
          {
            watchlist: [...user.watchlist, data],
          },
          { new: true },
        );
      } else return res.json({ msg: "Movie already added to the watchlist." });
    } else await User.create({ email, watchlist: [data] });
    return res.json({ msg: "Movie successfully added to watchlist." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the watchlist" });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const { data } = req.body;
    const { email, movieId } = data;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.watchlist;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          watchlist: movies,
        },
        { new: true },
      );
      return res.json({ msg: "Successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the watchlist" });
  }
};

//* WATCHED CONTROLLER

const getWatched = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.watched });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

const addToWatched = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { watched } = user;
      const addedToWatched = watched.find(({ id }) => id === data.id);
      if (!addedToWatched) {
        await User.findByIdAndUpdate(
          user._id,
          {
            watched: [...user.watched, data],
          },
          { new: true },
        );
      } else return res.json({ msg: "Movie already added to the watched." });
    } else await User.create({ email, watched: [data] });
    return res.json({ msg: "Movie successfully added to watched." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the watched" });
  }
};

const removeFromWatched = async (req, res) => {
  try {
    const { data } = req.body;
    const { email, movieId } = data;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.watched;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (movieIndex === -1) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          watched: movies,
        },
        { new: true },
      );
      return res.json({ msg: "Successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the watched" });
  }
};
module.exports = {
  register,
  login,
  getProfile,
  logout,
  addToFavorite,
  getFavorite,
  removeFromFavorite,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatched,
  addToWatched,
  removeFromWatched,
};
