import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieInfoPoster from "./MovieInfoPoster";
import MovieInfoSection from "./MovieInfoSection";
import MovieInfoButtons from "./MovieInfoButtons";

export default function MovieInfo() {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState({});
  const { id: movieId } = useParams();

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_DATABASE_URL}/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not Found!");
        }
        return res.json();
      })
      .then(setMovies);
  }, [movieId]);

  return (
    <div className="px-44 pb-10">
      <div className="flex rounded-lg bg-neutral-900 p-2">
        <MovieInfoPoster user={user} movies={movies} />
        <MovieInfoSection movies={movies} />
        {user && <MovieInfoButtons user={user} movies={movies} />}
      </div>
    </div>
  );
}
