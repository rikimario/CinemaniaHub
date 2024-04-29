import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Path from "@/paths/paths";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        username,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Register Successful!");
        navigate(`${Path.Login}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="inset-0 z-50 flex h-screen items-center justify-center bg-opacity-25 backdrop-blur-sm"
      id="register"
    >
      <div className="flex w-[600px] flex-col">
        <form
          onSubmit={registerSubmitHandler}
          className="space-y-6 rounded-lg bg-[#28262D] p-8"
          action="#"
          method="POST"
        >
          <div className="flex items-center justify-center font-bold text-white">
            <div className="flex text-2xl font-bold">
              <Link to={Path.Home} className="text-[#ffc107]">
                Cinema<span className="text-3xl">Hub</span>
              </Link>
              <Link to={Path.Home}>
                <div className="h-8 w-8">
                  <img
                    src="public\cinema-svgrepo-com.svg"
                    alt="cinema-svg"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              </Link>
            </div>
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
                placeholder="username"
                className="block w-full rounded-md border-0 py-1.5 pl-2 font-semibold text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ffc107] sm:text-sm sm:leading-6"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
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
              <div className="text-sm"></div>
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
              className="flex w-full justify-center rounded-md bg-[#ffc107] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#f7d263] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc107]"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center text-sm">
            <p>
              Have an account?
              <Link
                to={Path.Login}
                className="pl-2 font-semibold text-[#ffc107] hover:text-[#f7d263]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
