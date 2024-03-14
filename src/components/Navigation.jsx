export default function Navigation() {
  return (
    <nav className="flex py-8 px-11">
      <div className="font-bold text-xl">
        <button className="">CinemaniaHub</button>
      </div>

      <div className="flex-grow">
        <ul className="hidden lg:flex md:gap-6 lg:gap-14 md:text-center justify-center ">
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
      </div>

      <div className="pr-4 space-x-4">
        <button>
          <ion-icon size="large" name="search-outline"></ion-icon>
        </button>
        <button className="lg:hidden">
          <ion-icon size="large" name="menu-outline"></ion-icon>
        </button>
      </div>

      <div className="hidden lg:block space-x-4 ">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 hover:scale-105">
          Sign Up
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#00925D] text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 hover:scale-105">
          Login
        </button>
      </div>
    </nav>
  );
}
