import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = "589f3d4f48689702b074a222aea6db87";
const apiUrl = "https://api.themoviedb.org/3/movie";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { id: movieId } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/${movieId}?api_key=${apiKey}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not Found!");
        }
        return res.json();
      })
      .then(setMovie);
  }, [movieId]);
  return (
    <>
      <div className="pt-44">
        <h1>{movie.title}</h1>
      </div>
    </>
  );
}
