import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import * as listServices from "@/services/listServices";
import toast from "react-hot-toast";

export default function MovieInfoButtons({ user, movies }) {
  const [isInWatched, setIsInWatched] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const watchlistData = await listServices.fetchWatchlistData(user.email);
        if (watchlistData) {
          const isInWatchlist =
            watchlistData.find((item) => item.id === movies.id) !== undefined;
          setIsInWatchlist(isInWatchlist);
          localStorage.setItem("watchlist", JSON.stringify(watchlistData));
        }
      }
    };

    fetchData();
  }, [user, movies.id]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const watchedData = await listServices.fetchWatchedData(user.email);
        if (watchedData) {
          const isInWatched =
            watchedData.find((item) => item.id === movies.id) !== undefined;
          setIsInWatched(isInWatched);
          localStorage.setItem("watched", JSON.stringify(watchedData));
        }
      }
    };

    fetchData();
  }, [user, movies.id]);

  const handleAddToWatchlist = async () => {
    if (user) {
      const success = await listServices.addToWatchlist(user.email, movies);
      if (success) {
        setIsInWatchlist(true);
        toast.success("Added to Watchlist");
      }
    }
  };

  const handleAddToWatched = async () => {
    if (user) {
      const success = await listServices.addToWatched(user.email, movies);
      if (success) {
        setIsInWatched(true);
        toast.success("Added to Watched");
      }
    }
  };
  return (
    <div className="flex w-60 flex-col gap-4 p-6">
      {user && (
        <>
          {isInWatchlist ? (
            <div className="pt-2">
              <Button disabled className="w-full bg-[#266d5d] opacity-50">
                In Watchlist
              </Button>
            </div>
          ) : (
            <div className="pt-2">
              <Button
                onClick={() => handleAddToWatchlist()}
                className="w-full bg-[#266d5d]"
              >
                Watchlist
              </Button>
            </div>
          )}
        </>
      )}
      {user && (
        <>
          {isInWatched ? (
            <div className="pt-2">
              <Button disabled className="w-full bg-[#266d5d] opacity-50">
                In Watched
              </Button>
            </div>
          ) : (
            <div className="pt-2">
              <Button
                onClick={() => handleAddToWatched()}
                className="w-full bg-[#266d5d]"
              >
                Watched
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
