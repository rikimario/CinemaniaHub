import { useParams } from "react-router-dom";

import TvTrailer from "./tv-details-section/TvTrailer";
import TvInfo from "./tv-details-section/tv-info/TvInfo";
import TvImgSlider from "./tv-details-section/TvImgSlider";
import TvTopCast from "./tv-details-section/TvTopCast";
import TvMoreLikeThis from "./tv-details-section/TvMoreLikeThis";
import TvReviews from "./tv-details-section/TvReviews";

export default function TvDetails() {
  const { id: seriesId } = useParams();
  return (
    <>
      <TvTrailer id={seriesId} />
      <TvInfo id={seriesId} />
      <TvImgSlider seriesId={seriesId} />
      <TvTopCast seriesId={seriesId} />
      <TvMoreLikeThis seriesId={seriesId} />
      <TvReviews seriesId={seriesId} />
    </>
  );
}
