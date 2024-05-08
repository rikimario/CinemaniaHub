const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  register,
  login,
  logout,
  getProfile,
  addToFavorite,
  getFavorite,
  removeFromFavorite,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatched,
  addToWatched,
  removeFromWatched,
} = require("../controllers/authControllers");

// middleware
router.use(cors());
// * User
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/profile", getProfile);
router.get(
  "/profile",
  (req, res, next) => {
    // Set CORS headers dynamically based on the origin of the incoming request
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  },
  getProfile,
);

//* favorites
router.post("/user/favorite", addToFavorite);
router.get("/user/favorite/:email", getFavorite);
router.put("/user/favorite/remove", removeFromFavorite);

//* watchlist
router.post("/user/watchlist", addToWatchlist);
router.get("/user/watchlist/:email", getWatchlist);
router.put("/user/watchlist/remove", removeFromWatchlist);

//* watched
router.post("/user/watched", addToWatched);
router.get("/user/watched/:email", getWatched);
router.put("/user/watched/remove", removeFromWatched);
module.exports = router;
