import { useEffect, useState } from "react";

const apiUrl =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=589f3d4f48689702b074a222aea6db87";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(0, 5);
          setMovies(firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? movies.length - 1 : prevSlide - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === movies.length - 1 ? 0 : prevSlide + 1,
    );
  };
  return (
    <div className="relative h-full w-full overflow-hidden px-11 pt-12">
      <h1 className="pb-4 text-2xl text-white">Upcoming</h1>

      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {movies.map((movie, index) => (
          <div
            className={`relative flex h-[30rem] w-full items-center justify-center ${
              index === 0 ? "" : "hidden md:flex lg:block"
            }`}
            key={index}
          >
            <img
              className="absolute h-full w-auto rounded-xl   bg-black object-fill opacity-50"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
