import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

import FavoriteMovies from "../favoriteMovies/FavoriteMovies";
import WatchList from "../watchList/WatchList";
import Watched from "../watched/Watched";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("favorite");

  if (!user) {
    return null;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab === activeTab ? activeTab : tab);
  };
  return (
    <div className="overflow-hidden">
      <div className="flex gap-4 pt-32 px-11">
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 md:h-32 md:w-32">
          <span className="text-2xl font-medium text-gray-600 dark:text-gray-300 md:text-7xl">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-medium md:text-3xl">{user.username}</h1>
          <p className="text-[#9CA4AB]">{user.email}</p>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex gap-2 pb-2 pl-4 md:pl-11">
          <ToggleGroup type="single">
            <ToggleGroupItem value="favorite">
              <Button
                onClick={() => handleTabClick("favorite")}
                variant={"ghost"}
              >
                Favorite
              </Button>
            </ToggleGroupItem>

            <ToggleGroupItem value="watchlist">
              <Button
                onClick={() => handleTabClick("watchlist")}
                variant={"ghost"}
              >
                Watch list
              </Button>
            </ToggleGroupItem>

            <ToggleGroupItem value="watched">
              <Button
                onClick={() => handleTabClick("watched")}
                variant={"ghost"}
              >
                Watched
              </Button>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <Separator />
      </div>

      <div>
        {activeTab === "favorite" && <FavoriteMovies type="favorite" />}
        {activeTab === "watchlist" && <WatchList type="watchlist" />}
        {activeTab === "watched" && <Watched type="watched" />}
      </div>
    </div>
  );
}
