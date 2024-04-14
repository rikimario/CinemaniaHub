export default (state, action) => {
  switch (action.type) {
    // FAVORITE MOVIE //
    case "ADD_MOVIE_TO_FAVORITE":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id,
        ),
        favorite: [action.payload, ...state.favorite],
      };
    case "REMOVE_MOVIE_FROM_FAVORITE":
      return {
        ...state,
        favorite: state.favorite.filter((movie) => movie.id !== action.payload),
      };

    // WATCHED MOVIE //
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id,
        ),
        watched: [action.payload, ...state.watched],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    // WATCHLIST //
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};
