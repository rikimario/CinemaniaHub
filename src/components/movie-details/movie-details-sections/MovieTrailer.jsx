import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";
export default function MovieTrailer() {
  const [trailer, setTrailer] = useState("");
  const { id: movieId } = useParams();

  // Fetch movie trailer
  useEffect(() => {
    fetch(`${apiUrl}/${movieId}/videos?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (result) => result.type === "Trailer",
        );
        setTrailer(trailer?.key);
      });
  }, [movieId]);
  return (
    <div className="px-44 pb-10 pt-44">
      <div className="pb-2">
        <YouTube videoId={trailer} opts={{ width: "100%", height: "700px" }} />
      </div>
    </div>
  );
}
