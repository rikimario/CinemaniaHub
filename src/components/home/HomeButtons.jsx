import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import * as listServices from "@/services/listServices";

import Path from "@/paths/paths";
import toast from "react-hot-toast";

export default function HomeButtons({ id, movie }) {
  const { user } = useContext(AuthContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const watchlistData = await listServices.fetchWatchlistData(user.email);
        if (watchlistData) {
          const isInWatchlist =
            watchlistData.find((item) => item.id === movie.id) !== undefined;
          setIsInWatchlist(isInWatchlist);
        }
      }
    };

    fetchData();
  }, [user, movie.id]);

  const handleAddToWatchlist = async () => {
    if (user) {
      const success = await listServices.addToWatchlist(user.email, movie);
      if (success) {
        setIsInWatchlist(true);
        toast.success("Added to Watchlist");
      }
    }
  };

  return (
    <div className="relative z-40 flex space-x-4 pt-4 lg:flex lg:pt-8">
      <Link to={`${Path.MovieDetails}/${id}`} className="text-black">
        <Button
          variant="outline"
          className="h-6 rounded-md px-3 md:h-10 md:px-4 md:py-2 lg:h-10 lg:px-4 lg:py-2"
        >
          Read More
        </Button>
      </Link>
      {user && (
        <>
          {isInWatchlist ? (
            <div className="relative">
              <Button
                disabled
                className="h-6 rounded-md bg-[#ffc107] px-4 text-black hover:text-white md:h-10 md:py-2 lg:h-10  lg:py-2"
              >
                In Watchlist
                <div className="absolute right-0 top-0 text-[#555]">
                  <ion-icon name="bookmark" size="small"></ion-icon>
                </div>
              </Button>
            </div>
          ) : (
            <div className="relative">
              <Button
                onClick={() => handleAddToWatchlist()}
                className="h-6 rounded-md bg-[#ffc107] px-4 text-black hover:text-white md:h-10 md:py-2 lg:h-10  lg:py-2"
              >
                Add to Watchlist
                <div className="absolute right-0 top-0 ">
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
