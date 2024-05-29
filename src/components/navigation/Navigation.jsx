import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Path from "../../paths/paths";
import SearchResult from "../search-result-card/SearchResult";

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    fetch(
      `${import.meta.env.VITE_SEARCH_URL}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`,
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
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-sm backdrop-brightness-50 md:px-6 lg:px-11">
      <nav className="flex w-full items-center justify-between">
        <div className="flex font-bold lg:text-2xl">
          <Link
            to={Path.Home}
            className="text-sm text-[#ffc107] md:text-lg lg:text-xl"
          >
            Cinema<span className="text-lg md:text-2xl lg:text-3xl">Hub</span>
          </Link>
          <Link to={Path.Home}>
            <div className="h-7 w-7 lg:h-8 lg:w-8">
              <img
                src="/movie-folder-video-camera-svgrepo-com.svg"
                alt="cinema-svg"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </Link>
        </div>
        <div className="flex text-[1.3rem]">
          <ul className="left-0 right-0 flex justify-center gap-14">
            <div className="absolute top-5 min-w-40 max-w-60 md:min-w-80 lg:min-w-96">
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

        <div className="flex items-center space-x-4">
          {!user && (
            <Link to={Path.Login}>
              <Button
                variant="outline"
                className="border-none bg-[#333] text-white"
              >
                Login
              </Button>
            </Link>
          )}{" "}
          {user && (
            <>
              <Link to={`${Path.Profile}/@${user.username}`}>
                <div className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600 md:h-9 md:w-9 lg:h-9 lg:w-9">
                  <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Link>
              <Button onClick={logout} variant="outline" className="text-black">
                Sign out
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
