import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { StorageContext } from "@/context/storageContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import YouTube from "react-youtube";

import MoreLikeThis from "./movie-details-sections/MoreLikeThis";
import MovieReviews from "./movie-reviews/MovieReviews";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";

export default function MovieDetails() {
  const { addMovieToFavorite } = useContext(StorageContext);
  const [movies, setMovies] = useState({});
  const [trailer, setTrailer] = useState("");
  const [images, setImages] = useState([]);
  const [casts, setCasts] = useState([]);
  const { id: movieId } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/${movieId}?api_key=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not Found!");
        }
        return res.json();
      })
      .then(setMovies);
  }, [movieId]);

  // Fetch movie trailer
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (result) => result.type === "Trailer",
        );
        setTrailer(trailer?.key);
      });
  }, [movieId]);

  // Fetch movie images
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => setImages(data.backdrops))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [movieId]);

  // Fetch movie cast
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => setCasts(data.cast.slice(0, 12)))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  });
  return (
    <>
      <div className="px-44 pb-10 pt-44">
        <div className="pb-10">
          <YouTube
            videoId={trailer}
            opts={{ width: "100%", height: "700px" }}
          />
        </div>

        <div className="flex rounded-lg bg-neutral-900 p-2">
          <div className="m-w-[500px]">
            <img
              className="max-w-[250px] rounded-lg"
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              alt=""
            />
            <div className=" pt-2">
              <Button className="w-full bg-[#266d5d]">Favorite</Button>
            </div>
          </div>

          <div className="p-4 ">
            <h1 className="pb-4 text-2xl">{movies.title}</h1>
            <p>{movies.overview}</p>

            <div className="grid grid-cols-2">
              <div>
                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Genres:</h2>
                  {movies.genres && (
                    <p className="self-center text-lg text-[#266d5d]">
                      {movies.genres.map((genre) => genre.name).join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Budget:</h2>
                  <p className="self-center text-lg text-[#266d5d]">
                    ${movies.budget}
                  </p>
                </div>
                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Revenue:</h2>
                  <p className="self-center text-lg text-[#266d5d]">
                    ${movies.revenue}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Release date:</h2>
                  <p className="self-center text-lg text-[#266d5d]">
                    {movies.release_date}
                  </p>
                </div>

                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Duration:</h2>
                  <p className="self-center text-lg text-[#266d5d]">
                    {Math.floor(movies.runtime / 60)}h {movies.runtime % 60}m
                  </p>
                </div>

                <div className="flex items-center pt-4">
                  <h2 className="self-center pr-2 text-xl">Rating:</h2>
                  <p className="self-center text-lg text-[#266d5d]">
                    <span className="text-xl text-[#37a087]">
                      {Number(movies.vote_average).toFixed(1)}
                    </span>
                    /10
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-60 flex-col gap-4 p-6">
            <div className="pt-2">
              <Button className="w-full bg-[#266d5d]">Watchlist</Button>
            </div>
            <div className=" pt-2">
              <Button className="w-full bg-[#266d5d]">Watched</Button>
            </div>
          </div>
        </div>
      </div>
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
                      alt={movies.title}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>
      </div>

      <div className=" px-44 pb-10">
        <h2 className="p-4 text-2xl">
          <span className="font-bold text-[#266d5d]">|</span> Top Cast
        </h2>

        <div className="grid grid-cols-2 gap-4 rounded-lg bg-neutral-900 p-4">
          {casts &&
            casts.map((cast) => (
              <div className="flex">
                <img
                  className="h-32 w-32 rounded-full object-cover p-1"
                  key={cast.id}
                  src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                  alt={cast.name}
                />
                <div className="flex flex-col items-center justify-center pl-2">
                  <p className="text-xl">{cast.name}</p>
                  <p className="text-md text-[#9CA4AB]">{cast.character}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <MoreLikeThis id={movieId} />
      <MovieReviews id={movieId} />
    </>
  );
}
