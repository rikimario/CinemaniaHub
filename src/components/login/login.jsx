import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import axios from "axios";
import Path from "@/paths/paths";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login Successful. Welcome!");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="inset-0 z-50 flex items-center justify-center h-screen bg-opacity-25 "
      id="login"
    >
      <div className="flex w-[600px] flex-col">
        <form
          onSubmit={loginSubmitHandler}
          className="space-y-6 rounded-lg bg-[#28262D] p-8"
          action="#"
          method="POST"
        >
          <div className="flex flex-col items-center justify-center gap-4 font-bold text-white">
            <div className="flex text-2xl font-bold">
              <Link to={Path.Home} className="text-[#ffc107]">
                Cinema<span className="text-3xl">Hub</span>
              </Link>
              <Link to={Path.Home}>
                <div className="w-8 h-8">
                  <img
                    src="/movie-folder-video-camera-svgrepo-com.svg"
                    alt="cinema-svg"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              </Link>
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
                placeholder="example@ex.com"
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffc107] sm:text-sm sm:leading-6"
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
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="********"
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffc107] sm:text-sm sm:leading-6"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#ffc107] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#f0c546] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc107]"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-center text-sm">
            <p>
              Don't have an account?
              <Link
                to={Path.Register}
                className="pl-2 font-semibold text-[#ffc107] hover:text-[#f7d263]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
