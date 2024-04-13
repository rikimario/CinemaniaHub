import { useContext } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { StorageContext } from "@/context/storageContext";

export default function FavoriteMovies() {
  const { favorite } = useContext(StorageContext);
  return (
    <>
      <div className="pl-11 pt-6">
        <h1 className="text-2xl">Favorite movies</h1>
        <div className="grid grid-cols-5 py-10">
          {favorite.map((movie) => (
            <div className="w-56">
              <img
                className="h-full w-auto rounded-xl object-fill opacity-50"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
