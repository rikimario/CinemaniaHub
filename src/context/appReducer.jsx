export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_FAVORITE":
      return {
        ...state,
        favorite: [action.payload, ...state.favorite],
      };
    default:
      return state;
  }
};
