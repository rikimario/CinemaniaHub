import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import MovieControlls from "../movie-controlls/MovieControlls";

export default function WatchList({ type }) {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/user/watchlist/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const watchlistMovies = data.movies;
          setMovies(watchlistMovies);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const removeMovie = (movieId) => {
    setMovies(movies.filter((m) => m.id !== movieId));
  };
  return (
    <>
      <div className="pl-11 pt-6">
        <h1 className="text-2xl">Watchlist</h1>
        <div className="grid grid-cols-5">
          {movies.map((movie) => (
            <div key={movie.id} className="w-56 py-12 pb-6">
              <img
                className="h-full w-auto rounded-xl object-fill opacity-50"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieControlls
                type={type}
                movie={movie}
                onRemove={removeMovie}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
