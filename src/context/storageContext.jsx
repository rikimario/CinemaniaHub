import { createContext, useEffect, useReducer } from "react";
import appReducer from "./appReducer";

const initialState = {
  favorite: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// Create Context
export const StorageContext = createContext(initialState);

// Create Provider
export function StorageContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(state.favorite));
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions

  // FAVORITE MOVIE //
  const addMovieToFavorite = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVORITE", payload: movie });
  };

  const removeFromFavorite = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITE", payload: id });
  };

  // WATCHED MOVIE //
  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  // WATCHLIST //
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };
  const removeFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };
  return (
    <StorageContext.Provider
      value={{
        favorite: state.favorite,
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToFavorite,
        removeFromFavorite,
        addMovieToWatched,
        removeFromWatched,
        addMovieToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
