export default function MovieInfoSection({ movies }) {
  return (
    <div className="p-4 ">
      <h1 className="pb-4 text-2xl">{movies.title}</h1>
      <p>{movies.overview}</p>

      <div className="grid grid-cols-2">
        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Genres:</h2>
            {movies.genres && (
              <p className="self-center text-lg text-[#767676]">
                {movies.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Budget:</h2>
            <p className="self-center text-lg text-[#767676]">
              ${movies.budget}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Revenue:</h2>
            <p className="self-center text-lg text-[#767676]">
              ${movies.revenue}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Release date:</h2>
            <p className="self-center text-lg text-[#767676]">
              {movies.release_date}
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Duration:</h2>
            <p className="self-center text-lg text-[#767676]">
              {Math.floor(movies.runtime / 60)}h {movies.runtime % 60}m
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Rating:</h2>
            <p className="self-center text-lg text-[#767676]">
              <span className="text-xl text-[#ffc107]">
                {Number(movies.vote_average).toFixed(1)}
              </span>
              /10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
