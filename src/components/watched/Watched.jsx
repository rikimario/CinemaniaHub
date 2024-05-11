import { useContext, useEffect, useState } from "react";
import MovieControlls from "../movie-controlls/MovieControlls";
import { AuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";
import Path from "@/paths/paths";

export default function Watched({ movie, type }) {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const watched = async () => {
        const response = await fetch(
          `http://localhost:5000/user/watched/${user.email}`,
        );
        const data = await response.json();
        setMovies(data.movies);
      };

      watched();
    } catch (error) {
      console.log(error);
    }
  }, [user.email]);
  const removeMovie = (movieId) => {
    setMovies(movies.filter((m) => m.id !== movieId));
  };
  return (
    <>
      <div className="pt-6 pl-11">
        <h1 className="text-2xl">Favorite</h1>
        {movies.length > 0 ? (
          <div className="grid grid-cols-5">
            {movies.map((movie) => (
              <div key={movie.id} className="w-56 py-12 pb-6">
                {movie.number_of_episodes ? (
                  <Link to={`${Path.TvDetails}/${movie.id}`}>
                    <img
                      className="object-fill w-auto h-full duration-300 opacity-50 rounded-xl hover:scale-105 hover:transform hover:opacity-80"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.name}
                    />
                  </Link>
                ) : (
                  <Link to={`${Path.MovieDetails}/${movie.id}`}>
                    <img
                      className="object-fill w-auto h-full duration-300 opacity-50 rounded-xl hover:scale-105 hover:transform hover:opacity-80"
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
          <p className="text-2xl text-center">The list is empty!</p>
        )}
      </div>
    </>
  );
}
