import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiUrl =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=589f3d4f48689702b074a222aea6db87";

export default function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(0, 10);
          setMovies(firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  const settings = {
    slidesToShow: 5, // Display 5 images in a row
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    prevArrow: <button>Previous</button>,
    nextArrow: <button>Next</button>,
  };
  return (
    <div className="px-11 pt-12">
      <h1 className="pb-4 text-2xl text-white">Upcoming</h1>
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
