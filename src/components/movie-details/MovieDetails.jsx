import { useParams } from "react-router-dom";

import MoreLikeThis from "./movie-details-sections/MoreLikeThis";
import MovieReviews from "./movie-details-sections/MovieReviews";
import MovieTopCast from "./movie-details-sections/MovieTopCast";
import MovieImgSlider from "./movie-details-sections/MovieImgSlider";
import MovieInfo from "./movie-details-sections/movie-info/MovieInfo";
import MovieTrailer from "./movie-details-sections/MovieTrailer";

export default function MovieDetails() {
  const { id: movieId } = useParams();

  return (
    <div className="overflow-hidden px-2 md:px-12 lg:px-32">
      <MovieTrailer id={movieId} />
      <MovieInfo id={movieId} />
      <MovieImgSlider id={movieId} />
      <MovieTopCast id={movieId} />
      <MoreLikeThis id={movieId} />
      <MovieReviews id={movieId} />
    </div>
  );
}
