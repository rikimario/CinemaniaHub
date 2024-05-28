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
    <div className="relative z-40 flex pt-4 space-x-4 lg:flex lg:pt-8">
      <Link to={`${Path.MovieDetails}/${id}`} className="text-black">
        <Button variant="outline">Read More</Button>
      </Link>
      {user && (
        <>
          {isInWatchlist ? (
            <div className="relative">
              <Button
                disabled
                className="bg-[#ffc107] text-black hover:text-white"
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
                className="bg-[#ffc107] text-black hover:text-white"
              >
                Add to Watchlist
                <div className="absolute top-0 right-0 ">
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
