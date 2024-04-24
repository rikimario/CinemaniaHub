import { AuthContext } from "@/context/authContext";
import Path from "@/paths/paths";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function HomeButtons({ id, movie }) {
  const { user } = useContext(AuthContext);

  const addToWatchlist = async () => {
    try {
      await axios.post("http://localhost:5000/user/watchlist", {
        email: user.email,
        data: movie,
      });
    } catch (error) {
      console.log(error);
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
      <button
        onClick={() => addToWatchlist()}
        className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
      >
        Watchlist
      </button>
    </div>
  );
}
