import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function MovieControlls({ movie, type, onRemove }) {
  const { user } = useContext(AuthContext);

  const removeFavorite = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/favorite/remove`,
        {
          data: { email: user.email, movieId: movie.id },
        },
      );
      onRemove(movie.id);
      if (response.status.ok) {
        return response.data;
      } else {
        toast.success(response.data.msg);
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      return { msg: "Error removing movie from the liked list" };
    }
  };

  const removeWatchlist = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/watchlist/remove`,
        {
          data: { email: user.email, movieId: movie.id },
        },
      );
      onRemove(movie.id);
      if (response.status.ok) {
        return response.data;
      } else {
        toast.success(response.data.msg);
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      return { msg: "Error removing movie from the liked list" };
    }
  };

  const removeWatched = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/watched/remove`,
        {
          data: { email: user.email, movieId: movie.id },
        },
      );
      onRemove(movie.id);
      if (response.status.ok) {
        return response.data;
      } else {
        toast.success(response.data.msg);
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.log(error);
      return { msg: "Error removing movie from the liked list" };
    }
  };

  return (
    <div className="flex gap-2 pt-3">
      {type === "favorite" && (
        <Button onClick={() => removeFavorite()} variant={"destructive"}>
          Remove
        </Button>
      )}

      {type === "watchlist" && (
        <>
          <Button onClick={() => removeWatchlist()} variant={"destructive"}>
            Remove
          </Button>
        </>
      )}

      {type === "watched" && (
        <>
          <Button onClick={() => removeWatched()} variant={"destructive"}>
            Remove
          </Button>
        </>
      )}
    </div>
  );
}
