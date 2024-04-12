import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";

export default function Login({ closeLogin, handleCloseLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful. Welcome!");
        closeLogin();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {}
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div
      onClick={handleCloseLogin}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm"
      id="login"
    >
      <div className="flex w-[600px] flex-col">
        <button
          onClick={closeLogin}
          className="place-self-end text-xl text-white"
        >
          X
        </button>
        <form
          onSubmit={loginSubmitHandler}
          className="space-y-6 rounded-lg bg-[#28262D] p-8"
          action="#"
          method="POST"
        >
          <div className="flex items-center justify-center text-3xl font-bold text-white">
            <h1>CinemaHub</h1>
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
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
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
              <div className="text-sm">
                <a
                  href="#"
                  className="pl-2 font-semibold text-[#00925D] hover:text-[#00925de8]"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00925D] sm:text-sm sm:leading-6"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#00925D] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00925de8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00925D]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
