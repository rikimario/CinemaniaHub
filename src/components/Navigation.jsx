import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import Path from "../paths/paths";

export default function Navigation({ toggleLogin, toggleRegister }) {
  const { user, logout } = useContext(AuthContext);
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
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-11 py-8 backdrop-blur-sm backdrop-brightness-50">
      <nav className="flex w-full">
        <div className="text-2xl font-bold">
          <Link to={Path.Home} className="">
            CinemaHub
          </Link>
        </div>
        <div className="flex-grow text-[1.3rem]">
          <ul
            onClick={handleClick}
            className={`left-0 right-0 justify-center gap-6 lg:flex lg:gap-14 ${
              openNav
                ? "show flex h-screen flex-col items-center text-3xl lg:hidden"
                : "hidden"
            }
            `}
          >
            <Link
              to={Path.Home}
              className="text-[#9CA4AB] hover:scale-105 hover:text-white"
            >
              <li>Home</li>
            </Link>
            <Link
              to={Path.Discovery}
              className="text-[#9CA4AB] hover:scale-105 hover:text-white"
            >
              <li>Discovery</li>
            </Link>
            <button className="text-[#9CA4AB] hover:scale-105 hover:text-white">
              <li>Movie Release</li>
            </button>
            <button className="text-[#9CA4AB] hover:scale-105 hover:text-white">
              <li>About</li>
            </button>

            <div className="flex w-1/2 flex-col justify-center gap-4 lg:hidden ">
              {!user && (
                <>
                  <button
                    onClick={toggleRegister}
                    className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={toggleLogin}
                    className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-sm font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Login
                  </button>
                </>
              )}
              {user && (
                <div className="item-center flex flex-col justify-center gap-4">
                  <Link to={Path.Profile}>
                    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                      <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>

        <div className="space-x-4 pr-4">
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
        {!user && (
          <>
            <button
              onClick={toggleRegister}
              className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Sign Up
            </button>
            <button
              onClick={toggleLogin}
              className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Login
            </button>
          </>
        )}{" "}
        {user && (
          <>
            <div className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <Link to={Path.Profile}>
                <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </Link>
            </div>
            <button
              onClick={logout}
              className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
