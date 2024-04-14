import { StorageContext } from "@/context/storageContext";
import { useContext } from "react";
import { Button } from "../ui/button";

export default function MovieControlls({ movie, type }) {
  const {
    addMovieToWatched,
    addMovieToFavorite,
    removeFromFavorite,
    removeFromWatched,
    removeFromWatchlist,
  } = useContext(StorageContext);

  return (
    <div className="flex gap-2 pt-3">
      {type === "favorite" && (
        <>
          {/* {movie.id && (
            <Button
              onClick={() => addMovieToWatched(movie)}
              variant={"secondary"}
            >
              Watched
            </Button>
          )} */}

          {movie.id && (
            <Button
              variant={"destructive"}
              onClick={() => removeFromFavorite(movie.id)}
            >
              Remove
            </Button>
          )}
        </>
      )}

      {type === "watchlist" && (
        <>
          {movie.id && (
            <Button
              onClick={() => addMovieToWatched(movie)}
              variant={"secondary"}
            >
              Watched
            </Button>
          )}

          {movie.id && (
            <Button
              variant={"destructive"}
              onClick={() => removeFromWatchlist(movie.id)}
            >
              Remove
            </Button>
          )}
        </>
      )}

      {type === "watched" && (
        <>
          {movie.id && (
            <Button
              onClick={() => addMovieToFavorite(movie)}
              variant={"secondary"}
            >
              Favorite
            </Button>
          )}

          {movie.id && (
            <Button
              variant={"destructive"}
              onClick={() => removeFromWatched(movie.id)}
            >
              Remove
            </Button>
          )}
        </>
      )}
    </div>
  );
}
