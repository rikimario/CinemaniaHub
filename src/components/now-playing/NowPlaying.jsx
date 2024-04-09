import { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=589f3d4f48689702b074a222aea6db87";

export default function NowPlaying() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(apiUrl)
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
    <div className="px-11 pt-12">
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