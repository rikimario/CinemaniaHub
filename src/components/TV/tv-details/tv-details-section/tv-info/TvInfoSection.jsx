export default function TvInfoSection({ series }) {
  return (
    <div className="p-4 ">
      <h1 className="pb-4 text-2xl">{series.title}</h1>
      <p>{series.overview}</p>

      <div className="grid grid-cols-2">
        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Genres:</h2>
            {series.genres && (
              <p className="self-center text-lg text-[#767676]">
                {series.genres.map((genre) => genre.name).join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Created by:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.created_by?.map((creator) => creator.name).join(", ")}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Country:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.origin_country?.map((country) => country).join(", ")}
            </p>
          </div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Tagline:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.tagline}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">First Air date:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.first_air_date}
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Last Air Date:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.last_air_date}
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Seasons:</h2>
            <p className="self-center text-lg text-[#767676]">
              {series.number_of_seasons}
            </p>
          </div>

          <div className="flex items-center pt-4">
            <h2 className="self-center pr-2 text-xl">Rating:</h2>
            <p className="self-center text-lg text-[#767676]">
              <span className="text-xl text-[#ffc107]">
                {Number(series.vote_average).toFixed(1)}
              </span>
              /10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
