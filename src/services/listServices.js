import axios from "axios";

export const fetchWatchlistData = async (userEmail) => {
  try {
    const response = await axios.get(
      `https://cinema-hub-phi.vercel.app/user/watchlist/${userEmail}`,
    );
    const { movies } = response.data;

    // Check if movies is an array before using find()
    if (Array.isArray(movies)) {
      return movies;
    } else {
      console.error(
        "Watchlist data is not in the expected format:",
        response.data,
      );
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addToWatchlist = async (userEmail, movie) => {
  try {
    await axios.post("https://cinema-hub-phi.vercel.app/user/watchlist", {
      email: userEmail,
      data: movie,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchFavoriteData = async (userEmail) => {
  try {
    const response = await axios.get(
      `https://cinema-hub-phi.vercel.app/favorite/${userEmail}`,
    );
    const { movies } = response.data;

    // Check if movies is an array before using find()
    if (Array.isArray(movies)) {
      return movies;
    } else {
      console.error(
        "Favorite data is not in the expected format:",
        response.data,
      );
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addToFavorite = async (userEmail, movie) => {
  try {
    await axios.post("https://cinema-hub-phi.vercel.app/user/favorite", {
      email: userEmail,
      data: movie,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchWatchedData = async (userEmail) => {
  try {
    const response = await axios.get(
      `https://cinema-hub-phi.vercel.app/user/watched/${userEmail}`,
    );
    const { movies } = response.data;

    // Check if movies is an array before using find()
    if (Array.isArray(movies)) {
      return movies;
    } else {
      console.error(
        "Watched data is not in the expected format:",
        response.data,
      );
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addToWatched = async (userEmail, movie) => {
  try {
    await axios.post("https://cinema-hub-phi.vercel.app/user/watched", {
      email: userEmail,
      data: movie,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
