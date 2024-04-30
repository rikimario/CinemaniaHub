import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import * as listServices from "@/services/listServices";
import toast from "react-hot-toast";

export default function TvInfoPoster({ user, series }) {
  const [isInFavorite, setIsInFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const favoriteData = await listServices.fetchFavoriteData(user.email);
        if (favoriteData) {
          const isInFavorite =
            favoriteData.find((item) => item.id === series.id) !== undefined;
          setIsInFavorite(isInFavorite);
          localStorage.setItem("favorite", JSON.stringify(favoriteData));
        }
      }
    };

    fetchData();
  }, [user, series.id]);

  const handleAddToFavorite = async () => {
    if (user) {
      const success = await listServices.addToFavorite(user.email, series);
      if (success) {
        setIsInFavorite(true);
        toast.success("Added to Favorite");
      }
    }
  };
  return (
    <div className="m-w-[500px]">
      <img
        className="max-w-[250px] rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
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
                  <ion-icon name="bookmark" size="large"></ion-icon>
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
                <div className="absolute right-0 top-[0.4rem] ">
                  <ion-icon name="bookmark-outline" size="large"></ion-icon>
                </div>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
