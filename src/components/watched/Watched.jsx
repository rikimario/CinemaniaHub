import { useContext, useEffect, useState } from "react";
import MovieControlls from "../movie-controlls/MovieControlls";
import { AuthContext } from "@/context/authContext";

export default function Watched({ movie, type }) {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/user/watched/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const watchedMovies = data.movies;
          setMovies(watchedMovies);
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
        <h1 className="text-2xl">Watched movies</h1>
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
