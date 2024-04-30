import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MovieControlls from "../movie-controlls/MovieControlls";
import Path from "@/paths/paths";

export default function FavoriteMovies({ type }) {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/user/favorite/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const favoriteMovies = data.movies;
          setMovies(favoriteMovies);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user.email]);

  const removeMovie = (movieId) => {
    setMovies(movies.filter((m) => m.id !== movieId));
  };

  return (
    <>
      <div className="pl-11 pt-6">
        <h1 className="text-2xl">Favorite</h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-5">
            {movies.map((movie) => (
              <div key={movie.id} className="w-56 py-12 pb-6">
                {movie.number_of_episodes ? (
                  <Link to={`${Path.TvDetails}/${movie.id}`}>
                    <img
                      className="h-full w-auto rounded-xl object-fill opacity-50 duration-300 hover:scale-105 hover:transform hover:opacity-80"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.name}
                    />
                  </Link>
                ) : (
                  <Link to={`${Path.MovieDetails}/${movie.id}`}>
                    <img
                      className="h-full w-auto rounded-xl object-fill opacity-50 duration-300 hover:scale-105 hover:transform hover:opacity-80"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                )}

                <MovieControlls
                  type={type}
                  movie={movie}
                  onRemove={removeMovie}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl">The list is empty!</p>
        )}
      </div>
    </>
  );
}
