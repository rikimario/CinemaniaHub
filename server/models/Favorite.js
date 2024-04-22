const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
