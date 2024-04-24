import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

import FavoriteMovies from "../favoriteMovies/FavoriteMovies";
import WatchList from "../watchList/WatchList";
import Watched from "../watched/Watched";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("favorite");

  if (!user) {
    return null;
  }

  let type = "";
  if (activeTab === "favorite") {
    type = "favorite";
  } else if (activeTab === "watchlist") {
    type = "watchlist";
  } else if (activeTab === "watched") {
    type = "watched";
  }
  return (
    <>
      <div className="flex gap-4 px-11 pt-32">
        <div className="relative inline-flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <span className="text-7xl font-medium text-gray-600 dark:text-gray-300">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-medium">{user.username}</h1>
          <p className="text-[#9CA4AB]">{user.email}</p>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex gap-2 pb-2 pl-11">
          <Button
            onClick={() => setActiveTab("favorite")}
            active={activeTab === "favorite"}
            variant="ghost"
          >
            Favorite
          </Button>
          <Button
            onClick={() => setActiveTab("watchlist")}
            active={activeTab === "watchlist"}
            variant="ghost"
          >
            Watch list
          </Button>
          <Button
            onClick={() => setActiveTab("watched")}
            active={activeTab === "watched"}
            variant="ghost"
          >
            Watched
          </Button>
        </div>
        <Separator />
      </div>

      <div>
        {activeTab === "favorite" && <FavoriteMovies type={type} />}
        {activeTab === "watchlist" && <WatchList type={type} />}
        {activeTab === "watched" && <Watched type={type} />}
      </div>
    </>
  );
}
