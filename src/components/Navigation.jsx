import { useState } from "react";
import DropMenu from "./DropMenu";
import MenuButtons from "../assets/MenuButtons";

export default function Navigation() {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    if (openNav) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  };

  const handleClick = () => {
    setOpenNav(false);
  };

  return (
    <div className="fixed inset-x-0 top-0 flex justify-between items-center py-8 px-11 backdrop-blur-sm backdrop-brightness-50">
      <nav className="flex w-full">
        <div className="font-bold text-2xl">
          <button className="">CinemaniaHub</button>
        </div>
        <div className="flex-grow text-[1.3rem]">
          <ul
            onClick={handleClick}
            className={`lg:flex gap-6 lg:gap-14 justify-center ${
              openNav
                ? "show flex items-center flex-col pt-12 text-3xl lg:hidden"
                : "hidden"
            }
            `}
          >
            <button className="text-[#9CA4AB] hover:text-white hover:scale-105">
              <li>Home</li>
            </button>
            <button className="text-[#9CA4AB] hover:text-white hover:scale-105">
              <li>Discovery</li>
            </button>
            <button className="text-[#9CA4AB] hover:text-white hover:scale-105">
              <li>Movie Release</li>
            </button>
            <button className="text-[#9CA4AB] hover:text-white hover:scale-105">
              <li>About</li>
            </button>

            <MenuButtons />
          </ul>
        </div>

        <div className="pr-4 space-x-4">
          <button>
            <ion-icon size="large" name="search-outline"></ion-icon>
          </button>
          <button
            onClick={toggleNav}
            className={`lg:hidden ${openNav ? "hidden" : "show"}`}
          >
            <ion-icon size="large" name="menu-outline"></ion-icon>
          </button>

          <button
            onClick={toggleNav}
            className={`lg:hidden ${openNav ? "show" : "hidden"}`}
          >
            <ion-icon
              className="hidden"
              size="large"
              name="close-outline"
            ></ion-icon>
          </button>
        </div>
      </nav>

      <div className="hidden space-x-4 lg:flex">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 hover:scale-105">
          Sign Up
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#00925D] text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 hover:scale-105">
          Login
        </button>
      </div>
    </div>
  );
}
