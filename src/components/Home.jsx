import { useEffect, useState } from "react";

const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=589f3d4f48689702b074a222aea6db87";

export default function Home() {
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data.results.slice(0, 5));
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  return (
    <>
      <div className="relative h-screen w-screen">
        {movies.map((movie) => (
          <div
            className="relative flex h-full w-full bg-cover bg-center"
            key={movie.id}
          >
            {console.log(movie)}
            <img
              className="md:object-over absolute inset-0 h-full w-full bg-black opacity-50 lg:object-cover"
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
                <p className="lg:2/3 flex overflow-hidden pr-11 pt-8 text-xl leading-8 md:w-2/3">
                  {movie.overview}
                </p>
                {/* <span className="z-50 text-2xl text-white">
                  ...
                  <a className="text-[#00925D]" href="#">
                    Read more
                  </a>
                </span> */}

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
        ))}
      </div>
    </>
  );
}
