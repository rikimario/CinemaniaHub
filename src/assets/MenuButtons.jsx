export default function MenuButtons() {
  return (
    <>
      <div className="lg:hidden flex flex-col gap-4 w-1/2 justify-center ">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 hover:scale-105">
          Sign Up
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#00925D] text-destructive-foreground shadow-sm hover:bg-destructive/90 h-8 px-3 hover:scale-105">
          Login
        </button>
      </div>
    </>
  );
}
