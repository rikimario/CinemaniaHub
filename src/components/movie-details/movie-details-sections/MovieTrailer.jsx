import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

export default function MovieTrailer() {
  const [trailer, setTrailer] = useState("");
  const { id: movieId } = useParams();

  // Fetch movie trailer
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_DATABASE_URL}/${movieId}/videos?api_key=${import.meta.env.VITE_API_KEY}`,
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
    <div className="pb-10 pt-24 md:pb-10 md:pt-44">
      <div className="h-64 pb-2 md:h-80 lg:h-[34rem]">
        <YouTube
          videoId={trailer}
          opts={{ width: "100%", height: "100%" }}
          className="h-full"
        />
      </div>
    </div>
  );
}
