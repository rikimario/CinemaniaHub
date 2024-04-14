import { useContext } from "react";
import { StorageContext } from "@/context/storageContext";
import MovieControlls from "../movie-controlls/MovieControlls";

export default function Watched({ movie, type }) {
  const { watched } = useContext(StorageContext);
  return (
    <>
      <div className="pl-11 pt-6">
        <h1 className="text-2xl">Watched movies</h1>
        <div className="grid grid-cols-5 py-10">
          {watched.map((movie) => (
            <div key={movie.id} className="w-56 pb-6">
              <img
                className="h-full w-auto rounded-xl object-fill opacity-50"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieControlls type={type} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
