import { Link } from "react-router-dom";
import Path from "@/paths/paths";

export default function SearchResult({ id, result }) {
  return (
    <>
      {result.media_type === "tv" ? (
        <Link to={`${Path.TvDetails}/${id}`} className="flex">
          <div>
            {result.poster_path ? (
              <img
                className="w-32 rounded-lg"
                key={result.id}
                src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`}
                alt=""
              />
            ) : (
              <img
                className="w-32 rounded-lg"
                key={result.id}
                src={`https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg`}
                alt=""
              />
            )}
          </div>

          <div className="p-4">
            {result.name ? (
              <div>
                <h3 className="text-sm font-bold">{result.name}</h3>
              </div>
            ) : (
              <h3 className="text-sm font-bold">N/A</h3>
            )}
            {result.first_air_date ? (
              <p className="text-sm text-[#9CA4AB]">
                {new Date(result.first_air_date).getFullYear()}
              </p>
            ) : (
              <p className="text-sm text-[#9CA4AB]">N/A</p>
            )}
          </div>
        </Link>
      ) : (
        <Link to={`${Path.MovieDetails}/${id}`} className="flex">
          <div>
            {result.poster_path ? (
              <img
                className="w-32 rounded-lg"
                key={result.id}
                src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`}
                alt=""
              />
            ) : (
              <img
                className="w-32 rounded-lg"
                key={result.id}
                src={`https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg`}
                alt=""
              />
            )}
          </div>

          <div className="p-4">
            <div>
              <h3 className="text-sm font-bold">{result.title}</h3>
            </div>
            <p className="text-sm text-[#9CA4AB]">
              {new Date(result.release_date).getFullYear()}
            </p>
          </div>
        </Link>
      )}
    </>
  );
}
