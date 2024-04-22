const Favorite = require("../models/Favorite");

const importFavorite = async (req, res) => {
  await Favorite.deleteMany({});
  const favorite = await Favorite.insertMany(req.body);
  res.status(201).json(favorite);
};

const getFavorite = async (req, res) => {
  try {
    const { title, poster_path } = req.query;
    let query = {
      ...(title && { title }),
      ...(poster_path && { poster_path }),
    };
  } catch (error) {}
};

const getFavoriteById = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);

    if (movie) {
      res.json(favorite);
    } else {
      res.status(400);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  importFavorite,
  getFavoriteById,
};
