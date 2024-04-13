import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { StorageContext } from "@/context/storageContext";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";

export default function MovieDetails({ movie }) {
  const { addMovieToFavorite } = useContext(StorageContext);
  const [movies, setMovies] = useState({});
  const { id: movieId } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/${movieId}?api_key=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not Found!");
        }
        return res.json();
      })
      .then(setMovies);
  }, [movieId]);
  return (
    <>
      <div className="pt-44">
        <h1>{movies.title}</h1>

        <div className="p-4">
          <Button onClick={() => addMovieToFavorite(movie)}>
            add Favorite
          </Button>
        </div>
      </div>
    </>
  );
}
