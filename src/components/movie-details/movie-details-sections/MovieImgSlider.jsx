import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export default function MovieImgSlider() {
  const [images, setImages] = useState([]);
  const { id: movieId } = useParams();

  const apiKey = "589f3d4f48689702b074a222aea6db87";
  const apiUrl = "https://api.themoviedb.org/3/movie";

  // Fetch movie images
  useEffect(() => {
    fetch(`${apiUrl}/${movieId}/images?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setImages(data.backdrops))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [movieId]);
  return (
    <div className="px-44 pb-10">
      <h2 className="p-4 text-2xl">
        <span className="font-bold text-[#266d5d]">|</span> Photos
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
