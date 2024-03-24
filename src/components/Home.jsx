import { useEffect, useState } from "react";

const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=589f3d4f48689702b074a222aea6db87";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(0, 5);
          setMovies(firstFiveMovies);
          console.log("Fetched movies:", firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) => {
  //     if (prevSlide === 0) {
  //       return movies.length - 1;
  //     } else {
  //       return prevSlide - 1;
  //     }
  //   });
  // };

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) => {
  //     if (prevSlide === movies.length - 1) {
  //       return 0;
  //     } else {
  //       return prevSlide + 1;
  //     }
  //   });
  // };

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

  useEffect(() => {
    console.log("Current slide:", currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    console.log("Movies:", movies);
  }, [movies]);

  return (
    <div className="relative flex overflow-hidden">
      {movies.map((movie, index) => (
        <div className="h-screen w-screen transition-transform duration-1000 ease-out">
          <div
            className="relative h-full w-screen bg-cover bg-center"
            key={index}
            style={{
              display: index === currentSlide ? "block" : "none",
            }}
          >
            <img
              className="md:object-over absolute h-full w-full bg-black opacity-50 lg:object-cover"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="absolute bottom-20 z-40 pl-11 lg:bottom-24">
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
                <div className="space-x-4 pt-8 lg:flex">
                  <button className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
                    Read More
                  </button>
                  <button className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-between p-1 lg:p-2">
        <button
          onClick={prevSlide}
          className="rounded-full bg-white/80 p-[0.1rem]  text-gray-800 shadow hover:bg-slate-100"
        >
          <ion-icon size="large" name="chevron-back-outline"></ion-icon>
          {/* <ion-icon size="large" name="chevron-back-circle-outline"></ion-icon> */}
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full bg-white/80 p-[0.1rem] text-gray-800 shadow hover:bg-slate-100"
        >
          <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}
