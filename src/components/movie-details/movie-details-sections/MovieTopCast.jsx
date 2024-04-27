import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieTopCast() {
  const [casts, setCasts] = useState([]);
  const { id: movieId } = useParams();

  // Fetch movie cast
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_DATABASE_URL}/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setCasts(data.cast.slice(0, 12)))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [movieId]);
  return (
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
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
                }
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
  );
}
