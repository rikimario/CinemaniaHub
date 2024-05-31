import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import * as listServices from "@/services/listServices";
import toast from "react-hot-toast";

export default function MovieInfoPoster({ movies, user }) {
  const [isInFavorite, setIsInFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const favoriteData = await listServices.fetchFavoriteData(user.email);
        if (favoriteData) {
          const isInFavorite =
            favoriteData.find((item) => item.id === movies.id) !== undefined;
          setIsInFavorite(isInFavorite);
        }
      }
    };

    fetchData();
  }, [user, movies.id]);

  const handleAddToFavorite = async () => {
    if (user) {
      const success = await listServices.addToFavorite(user.email, movies);
      if (success) {
        setIsInFavorite(true);
        toast.success("Added to Favorite");
      }
    }
  };
  return (
    <div className="">
      <img
        className="rounded-lg md:max-w-[200px]"
        src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
        alt=""
      />
      {user && (
        <>
          {isInFavorite ? (
            <div className="relative pt-2">
              <Button
                disabled
                className="w-full bg-[#ffc107] text-black opacity-50 hover:text-white"
              >
                In Favorite
                <div className="absolute right-0 top-[0.4rem] text-[#555]">
                  <ion-icon name="bookmark" size="small"></ion-icon>
                </div>
              </Button>
            </div>
          ) : (
            <div className="relative pt-2">
              <Button
                onClick={() => handleAddToFavorite()}
                className="w-full bg-[#ffc107] text-black hover:text-white"
              >
                Add to Favorite
                <div className="absolute right-0 top-[0.4rem]">
                  <ion-icon name="bookmark-outline" size="small"></ion-icon>
                </div>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
