import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { StorageContext } from "@/context/storageContext";
import YouTube from "react-youtube";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";

export default function MovieDetails({ movie }) {
  const { addMovieToFavorite } = useContext(StorageContext);
  const [movies, setMovies] = useState({});
  const [trailer, setTrailer] = useState("");
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
  return (
    <>
      <div className="px-48 py-44">
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

          <div className="pl-4 pr-24">
            <h1 className="pb-4 text-2xl">{movies.title}</h1>
            <p>{movies.overview}</p>

            <div className="grid grid-cols-2 pr-2">
              <div>
                <div className="flex items-center pt-6">
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
        </div>
      </div>
    </>
  );
}
