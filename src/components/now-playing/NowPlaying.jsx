import { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_DATABASE_URL}/now_playing?api_key=${import.meta.env.VITE_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(10, 20);
          setMovies(firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    centerPadding: "60px",
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
  };
  return (
    <div className="pt-12 lg:px-32">
      <h1 className="pb-4 text-2xl text-white">Now Playing</h1>
      <div className="">
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div
              className="h-[15rem] w-full md:h-[18rem] lg:h-[27rem]"
              key={index}
            >
              <img
                className="h-full w-auto rounded-xl bg-black object-fill opacity-50"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
