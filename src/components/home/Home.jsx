import { useEffect, useState } from "react";

import HomeButtons from "./HomeButtons";
import Upcoming from "../upcoming/Upcoming";
import NowPlaying from "../now-playing/NowPlaying";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_DATABASE_URL}/popular?api_key=${import.meta.env.VITE_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(0, 6);
          setMovies(firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    waitForAnimate: false,
  };
  return (
    <>
      <div className="relative overflow-hidden backdrop-blur-2xl before:absolute before:bottom-[-20px] before:left-0 before:z-50 before:h-[50px] before:w-screen before:bg-[#0d0c0f] before:blur-xl">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className="" key={movie.id}>
              <img
                className="w-full bg-black opacity-50"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
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

                  <HomeButtons
                    id={movie.id}
                    key={movie.id}
                    {...movies}
                    movie={movie}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Upcoming />
      <NowPlaying />
    </>
  );
}
