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

export default function NowPlayingTv() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_TV_DATABASE_URL}/on_the_air?api_key=${import.meta.env.VITE_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const firstTenSeries = data.results.slice(10, 20);
          setSeries(firstTenSeries);
        });
    } catch (error) {
      console.error("Error fetching series from TMDB:", error);
    }
  }, []);

  return (
    <div className="px-4 pt-8 pb-4 overflow-hidden md:px-12 lg:px-32">
      <h1 className="pb-4 text-white lg:text-2xl">
        <span className="font-bold text-[#ffc107]">|</span> Now Playing on TV
      </h1>
      <div className="">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="w-3/5 -ml-1">
            {series.map((tv, index) => (
              <CarouselItem
                className="px-6 pl-1 basis-24 md:basis-1/2 lg:basis-1/4"
                key={index}
              >
                <div className="h-28 md:h-[18rem] lg:h-72" key={index}>
                  <Link to={`${Path.TvDetails}/${tv.id}`}>
                    <img
                      className="object-fill w-auto h-full duration-300 bg-black opacity-50 rounded-xl hover:transform hover:opacity-80"
                      src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
                      alt={tv.title}
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
