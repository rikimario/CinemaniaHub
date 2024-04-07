import { useEffect, useState } from "react";
import axios from "axios";

export default function Register({ closeRegister, handleCloseRegister }) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { username, email, password })
      .then((result) => {
        console.log(result);
        closeRegister();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div
      onClick={handleCloseRegister}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
      id="register"
    >
      <div className="flex w-[600px] flex-col">
        <button
          onClick={closeRegister}
          className="place-self-end text-xl text-white"
        >
          X
        </button>
        <form
          onSubmit={registerSubmitHandler}
          className="space-y-6 rounded-lg bg-[#28262D] p-8"
          action="#"
          method="POST"
        >
          <div className="flex items-center justify-center text-3xl font-bold text-white">
            <h1>CinemaHub</h1>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00925D] sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00925D] sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00925D] sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#00925D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00925de8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00925D]"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
