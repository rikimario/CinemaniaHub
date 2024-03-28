export default function MenuButtons({
  toggleLogin,
  toggleRegister,
  loginVisible,
  registerVisible,
}) {
  return (
    <>
      <div className="flex w-1/2 flex-col justify-center gap-4 lg:hidden ">
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
      </div>
    </>
  );
}
