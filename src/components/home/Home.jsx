import { useEffect, useState } from "react";

import HomeButtons from "./HomeButtons";

const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=589f3d4f48689702b074a222aea6db87";

export default function Home({ loginVisible, registerVisible }) {
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

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Extracting movie IDs from the response
      const movieIds = data.results.map((movie) => movie.id);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

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
    <div className="relative flex overflow-hidden backdrop-blur-2xl before:absolute before:bottom-[-20px] before:left-0 before:z-50 before:h-[50px] before:w-screen before:bg-[#0d0c0f] before:blur-xl">
      <div className="h-screen w-screen transition-transform duration-1000 ease-out">
        {movies.map((movie, index) => (
          <div
            className="relative h-full w-screen bg-cover bg-center"
            key={index}
            style={{
              display: index === currentSlide ? "block" : "none",
            }}
          >
            <img
              className="absolute h-full w-full bg-black opacity-50 md:object-cover lg:object-cover"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="absolute bottom-20 pl-11 lg:bottom-24">
              <h1 className="text-3xl text-white md:text-4xl lg:text-6xl">
                {movie.title}
              </h1>
              <p className="pt-2 text-[#9CA4AB]">
                Release Date: {movie.release_date}
              </p>
              <div className="">
                <p className="lg:2/3 flex overflow-hidden pr-11 pt-8 text-lg leading-8 md:w-2/3 lg:text-xl">
                  {movie.overview}
                </p>

                <HomeButtons />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-1 lg:p-2">
        <button
          onClick={prevSlide}
          className="flex rounded-full bg-[#28262D] p-1 hover:bg-white hover:text-[#28262D]"
        >
          <ion-icon size="large" name="chevron-back-outline"></ion-icon>
        </button>
        <button
          onClick={nextSlide}
          className="flex rounded-full bg-[#28262D] p-1 hover:bg-white hover:text-[#28262D]"
        >
          <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
      {loginVisible}
      {registerVisible}
    </div>
  );
}
