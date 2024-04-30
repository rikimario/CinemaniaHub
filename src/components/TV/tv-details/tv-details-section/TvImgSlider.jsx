import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export default function TvImgSlider({ seriesId }) {
  const [images, setImages] = useState([]);

  // Fetch movie images
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TV_DATABASE_URL}/${seriesId}/images?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setImages(data.backdrops))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [seriesId]);
  return (
    <div className="px-44 pb-10">
      <h2 className="p-4 text-2xl">
        <span className="font-bold text-[#ffc107]">|</span> Photos
      </h2>
      <div className="rounded-lg bg-neutral-900">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {images &&
              images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <img
                    className="flex w-full items-center justify-center p-6"
                    key={image.file_path}
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt=""
                  />
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
