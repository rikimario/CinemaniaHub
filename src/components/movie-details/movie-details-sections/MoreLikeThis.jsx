import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Path from "@/paths/paths";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";

export default function MoreLikeThis() {
  const { id: movieId } = useParams();
  const [similars, setSimilars] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/${movieId}/similar?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setSimilars(data.results))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  });
  return (
    <div className="px-44 pb-10">
      <h2 className="p-4 text-2xl">
        <span className="font-bold text-[#266d5d]">|</span> More Like This
      </h2>
      <div className="rounded-lg bg-neutral-900">
        <Carousel>
          <CarouselContent className="-ml-1 w-3/5">
            {similars &&
              similars.map((similar, index) => (
                <CarouselItem
                  key={index}
                  className="border-x-[1px] border-teal-900 pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="">
                    <img
                      className="flex w-full items-center justify-center p-4"
                      key={similar.title}
                      src={`https://image.tmdb.org/t/p/original/${similar.poster_path}`}
                      alt={similar.title}
                    />

                    <h2 className="truncate px-4 text-lg">{similar.title}</h2>
                    <p className="text-md px-4 text-[#9CA4AB]">
                      {new Date(similar.release_date).getFullYear()}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col justify-end px-2 py-2">
                    <Button className="bg-[#266d5d]">Watchlist</Button>
                  </div>
                  <div className="px-2 text-black">
                    <Link to={`${Path.MovieDetails}/${similar.id}`}>
                      <Button
                        className="rounded-full"
                        variant="outline"
                        size="sm"
                      >
                        i
                      </Button>
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
