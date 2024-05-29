import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Separator } from "../ui/separator";

import HomeButtons from "./HomeButtons";
import Upcoming from "../upcoming/Upcoming";
import NowPlaying from "../now-playing/NowPlaying";
import Autoplay from "embla-carousel-autoplay";
import NowPlayingTv from "../TV/NowPlayingTv";
import AirToday from "../TV/AirToday";
import PopularTv from "../TV/PopularTv";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      fetch(
        `${import.meta.env.VITE_DATABASE_URL}/popular?api_key=${import.meta.env.VITE_API_KEY}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const firstSixMovies = data.results.slice(0, 6);
          setMovies(firstSixMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  const plugin = useRef(Autoplay({ delay: 4000 }));
  return (
    <>
      <div className="relative overflow-hidden backdrop-blur-2xl before:absolute before:bottom-[-20px] before:left-0 before:z-50 before:h-[45px] before:w-screen before:bg-[#0d0c0f] before:blur-lg">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {movies.map((movie, index) => (
              <CarouselItem key={index}>
                <div className="relative max-h-[760px]" key={movie.id}>
                  <img
                    className="h-96 w-full bg-black object-cover opacity-50 md:h-full lg:h-full"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                  <div className="absolute bottom-5 pl-6 md:bottom-20 md:pl-11 lg:bottom-24 lg:pl-11">
                    <h1 className="text-sm text-white md:text-2xl lg:text-3xl">
                      {movie.title}
                    </h1>
                    <p className="pt-2 text-[0.5rem] text-[#9CA4AB] md:text-sm">
                      Release Date: {movie.release_date}
                    </p>
                    <div>
                      <p className="lg:2/3 flex overflow-hidden overflow-ellipsis pr-11 pt-4 text-xs leading-5 md:w-2/3 md:leading-8 lg:pt-8 lg:text-xl lg:leading-8">
                        {movie.overview.length > 120
                          ? `${movie.overview.slice(0, 70)}...`
                          : movie.overview}
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <NowPlaying />
      <Upcoming />
      <div className="px-12 lg:px-32">
        <Separator />
      </div>
      <NowPlayingTv />
      <PopularTv />
      <AirToday />
    </>
  );
}
