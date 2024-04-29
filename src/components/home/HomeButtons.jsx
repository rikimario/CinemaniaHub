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
          localStorage.setItem("watchlist", JSON.stringify(watchlistData));
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
    <div className="relative z-40 space-x-4 pt-8 lg:flex">
      <Link
        to={`${Path.MovieDetails}/${id}`}
        className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        Read More
      </Link>
      {user && (
        <>
          {isInWatchlist ? (
            <Button
              disabled
              className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925d6e] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              In Watchlist
            </Button>
          ) : (
            <Button
              onClick={() => handleAddToWatchlist()}
              className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Watchlist
            </Button>
          )}
        </>
      )}
    </div>
  );
}
