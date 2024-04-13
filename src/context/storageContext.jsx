import { createContext, useEffect, useReducer } from "react";
import appReducer from "./appReducer";

const initialState = {
  favorite: localStorage.getItem("favorite")
    ? JSON.parse(localStorage.getItem("favorite"))
    : [],
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
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
  }, [state]);

  // actions
  const addMovieToFavorite = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVORITE", payload: movie });
    console.log("works");
  };
  return (
    <StorageContext.Provider
      value={{
        favorite: state.favorite,
        watchlist: state.watchlist,
        addMovieToFavorite,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
