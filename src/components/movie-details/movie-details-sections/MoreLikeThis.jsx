import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Path from "@/paths/paths";
export default function MoreLikeThis() {
  const { id: movieId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_DATABASE_URL}/${movieId}/similar?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [movieId]);

  return (
    <div className="px-44 pb-10">
      <h2 className="p-4 text-2xl">
        <span className="font-bold text-[#ffc107]">|</span> More Like This
      </h2>
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-1 w-3/5">
            {movies &&
              movies.map((similar, index) => (
                <CarouselItem
                  key={index}
                  className="px-6 pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="rounded-xl">
                    <div className="h-[24rem] w-full">
                      <img
                        className="h-full w-auto  rounded-t-2xl bg-black object-fill opacity-50"
                        key={similar.title}
                        src={`https://image.tmdb.org/t/p/original/${similar.poster_path}`}
                        alt={similar.title}
                      />
                    </div>

                    <div className="flex flex-col bg-neutral-900">
                      <h2 className="truncate px-4 text-lg">{similar.title}</h2>
                      <p className="text-md px-4 text-[#9CA4AB]">
                        {new Date(similar.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>

                  <Link to={`${Path.MovieDetails}/${similar.id}`}>
                    <div className="relative mt-auto flex flex-col justify-end bg-neutral-900 px-2 py-2">
                      <Button className="bg-[#ffc107] text-black hover:text-white">
                        Read more
                      </Button>
                    </div>
                  </Link>
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
