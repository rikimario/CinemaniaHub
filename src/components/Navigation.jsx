import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Input } from "./ui/input";

import Path from "../paths/paths";
import SearchResult from "./search-result-card/SearchResult";

const apiKey = "589f3d4f48689702b074a222aea6db87";
export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  const handleClick = () => {
    setResults([]);
    setQuery("");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-11 py-8 backdrop-blur-sm backdrop-brightness-50">
      <nav className="flex w-full justify-between ">
        <div className="text-2xl font-bold">
          <Link to={Path.Home} className="">
            CinemaHub
          </Link>
        </div>
        <div className="flex text-[1.3rem]">
          <ul className="left-0 right-0 flex justify-center gap-14">
            <div className="absolute min-w-[30rem] max-w-[30rem]">
              <Input
                type="text"
                value={query}
                onChange={onChange}
                placeholder="Search"
                className="text-lg text-black"
              />
              {results.length > 0 && (
                <ul
                  onClick={handleClick}
                  className="scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-500 max-h-[30rem] overflow-y-auto rounded-md bg-[#0d0c0f] shadow-md"
                >
                  {results.map((result) => (
                    <li className="p-2 hover:bg-[#1b181f]" key={result.id}>
                      <SearchResult
                        result={result}
                        id={result.id}
                        key={result.id}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ul>
        </div>

        <div className="flex space-x-4">
          {!user && (
            <>
              <Link
                to={Path.Register}
                className="focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md border px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign Up
              </Link>
              <Link
                to={Path.Login}
                className="focus-visible:ring-ring text-destructive-foreground hover:bg-destructive/90 inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md bg-[#00925D] px-3 text-lg font-medium shadow-sm transition-colors hover:scale-105 focus-visible:outline-none focus-visible:ring-1"
              >
                Login
              </Link>
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
      </nav>
    </div>
  );
}
