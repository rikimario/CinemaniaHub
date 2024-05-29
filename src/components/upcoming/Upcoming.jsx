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

export default function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_DATABASE_URL}/upcoming?api_key=${import.meta.env.VITE_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const firstTenMovies = data.results.slice(0, 10);
          setMovies(firstTenMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  return (
    <div className="px-12 py-12 lg:px-32">
      <h1 className="pb-4 text-white lg:text-2xl">
        <span className="font-bold text-[#ffc107]">|</span> Upcoming
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
                className="basis-1/2 px-6 pl-1 lg:basis-1/4"
                key={index}
              >
                <div className="h-28 md:h-[18rem] lg:h-72" key={index}>
                  <Link to={`${Path.MovieDetails}/${movie.id}`}>
                    <img
                      className="h-full w-auto rounded-xl bg-black object-fill opacity-50 duration-300 hover:transform hover:opacity-80"
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
