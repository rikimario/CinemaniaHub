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
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 px-11 backdrop-blur-sm backdrop-brightness-50">
      <nav className="flex items-center justify-between w-full">
        <div className="flex font-bold lg:text-2xl">
          <Link to={Path.Home} className="text-xl text-[#ffc107]">
            Cinema<span className="text-2xl lg:text-3xl">Hub</span>
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
            <div className="absolute top-5 max-w-[20rem] md:min-w-[30rem]">
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
                <div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full h-9 w-9 dark:bg-gray-600">
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
