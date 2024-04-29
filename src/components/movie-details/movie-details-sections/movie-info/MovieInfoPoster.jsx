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
          localStorage.setItem("favorite", JSON.stringify(favoriteData));
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
    <div className="m-w-[500px]">
      <img
        className="max-w-[250px] rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
        alt=""
      />
      {user && (
        <>
          {isInFavorite ? (
            <div className=" pt-2">
              <Button disabled className="w-full bg-[#266d5d] opacity-50">
                In Favorite
              </Button>
            </div>
          ) : (
            <div className=" pt-2">
              <Button
                onClick={() => handleAddToFavorite()}
                className="w-full bg-[#266d5d]"
              >
                Favorite
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
