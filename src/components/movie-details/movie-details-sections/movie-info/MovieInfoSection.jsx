export default function MovieInfoSection({ movies }) {
  return (
    <div className="p-4 lg:p-2">
      <h1 className="pb-4 md:text-base lg:text-2xl">{movies.title}</h1>
      <p className="md:text-xs md:leading-5">{movies.overview}</p>

      <div className="grid grid-cols-2">
        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">Genres:</h2>
            {movies.genres && (
              <p className="self-center text-sm text-[#767676] lg:text-base">
                {movies.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">Budget:</h2>
            <p className="self-center text-sm text-[#767676] lg:text-base">
              ${movies.budget}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">Revenue:</h2>
            <p className="self-center text-sm text-[#767676] lg:text-base">
              ${movies.revenue}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">
              Release date:
            </h2>
            <p className="self-center text-sm text-[#767676] lg:text-base">
              {movies.release_date}
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">Duration:</h2>
            <p className="self-center text-sm text-[#767676] lg:text-base">
              {Math.floor(movies.runtime / 60)}h {movies.runtime % 60}m
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-base lg:text-lg">Rating:</h2>
            <p className="self-center text-sm text-[#767676] lg:text-base">
              <span className="text-lg text-[#ffc107] lg:text-xl">
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
