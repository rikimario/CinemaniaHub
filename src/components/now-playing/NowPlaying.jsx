import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import Path from "@/paths/paths";

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

  return (
    <div className="pt-12 lg:px-32">
      <h1 className="pb-4 text-2xl text-white">
        <span className="font-bold text-[#ffc107]">|</span> Now Playing
      </h1>
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-1 w-3/5">
            {movies.map((movie, index) => (
              <CarouselItem
                className="px-6 pl-1 md:basis-1/2 lg:basis-1/3"
                key={index}
              >
                <div
                  className="h-[12rem] md:h-[18rem] lg:h-[27rem]"
                  key={index}
                >
                  <Link to={`${Path.MovieDetails}/${movie.id}`}>
                    <img
                      className="h-full w-auto rounded-xl bg-black object-fill opacity-50 duration-300  hover:transform hover:opacity-80"
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </div>
  );
}
