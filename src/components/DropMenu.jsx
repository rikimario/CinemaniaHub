import { useState } from "react";

export default function DropMenu() {
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
    <ul
      className={`lg:flex md:gap-6 lg:gap-14 md:text-center justify-center ${
        openNav ? "show flex flex-col" : "hidden"
      }`}
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
    </ul>
  );
}
