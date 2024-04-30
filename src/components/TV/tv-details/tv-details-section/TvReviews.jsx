import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function TvReviews({ seriesId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TV_DATABASE_URL}/${seriesId}/reviews?api_key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setReviews(data.results))
      .catch((error) =>
        console.error("Error fetching movies from TMDB:", error),
      );
  }, [seriesId]);
  return (
    <div className="px-44 pb-10">
      <h2 className="p-4 text-2xl">
        <span className="font-bold text-[#ffc107]">|</span> Users reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="p-4 text-center text-xl text-[#9CA4AB]">
          There are no reviews.
        </div>
      ) : (
        reviews.map((review, index) => (
          <Card className="my-6 flex gap-4 bg-neutral-900 pt-4" key={index}>
            <CardContent>
              <div key={index}>
                <div className="flex">
                  <img
                    className="h-32 w-32 rounded-full object-cover p-4"
                    src={
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`
                        : "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
                    }
                    alt={review.author}
                  />
                  <h2 className="flex items-center justify-center truncate px-4 text-2xl text-white">
                    {review.author}
                  </h2>
                </div>
                <p className="px-4 text-lg text-[#9CA4AB]">{review.content}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
