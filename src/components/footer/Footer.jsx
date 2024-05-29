import Path from "@/paths/paths";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="pt-32">
      <div className="bg-neutral-900 md:h-96 md:px-16 lg:h-96 lg:px-32">
        <div className="grid justify-around pt-10 text-center md:grid-cols-5 lg:grid-cols-5">
          <div className="text-2xl font-bold">
            <div className="flex justify-center text-lg font-bold lg:text-2xl">
              <Link to={Path.Home} className="text-[#ffc107]">
                Cinema
                <span className="text-2xl text-[#ffc107] lg:text-3xl">Hub</span>
              </Link>
              <Link to={Path.Home}>
                <div className="h-8 w-8">
                  <img
                    src="/movie-folder-video-camera-svgrepo-com.svg"
                    alt="cinema-svg"
                    style={{ transform: "scaleX(-1)" }}
                  />
                </div>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-10 text-[#555]">
              <div className="cursor-pointer hover:scale-105 hover:text-[#bbbbbb]">
                <a href="#">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </div>
              <div className="cursor-pointer hover:scale-105 hover:text-[#bbbbbb]">
                <a href="#">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </div>
              <div className="cursor-pointer hover:scale-105 hover:text-[#bbbbbb]">
                <a href="#">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </div>
            </div>

            <div className="pt-10 text-base text-[#bbbbbb] md:pt-20 md:text-sm">
              Copyright &copy; 2024 by CinemaHub, Inc. All rights reserved
            </div>
          </div>

          <div>
            <h2 className="md:text-md pt-10 text-xl font-extrabold text-[#555] md:pt-0 lg:pt-0">
              Contact us
            </h2>
            <p className="lg:text-md text-md px-6 pt-5 text-[#bbbbbb] md:text-sm lg:px-12 lg:pt-10">
              623 Harrison St., 2nd Floor, San Francisco, CA 94107
            </p>
            <p className="px-6 pt-5 text-base text-[#bbbbbb] md:pt-[3.2rem] md:text-sm lg:px-12 lg:pt-[3.2rem]">
              415-201-6370 hello@cinemahub.com
            </p>
          </div>

          <div>
            <h2 className="md:text-md pt-10 text-xl font-extrabold text-[#555] md:pt-0 lg:pt-0">
              Company
            </h2>
            <p className="cursor-pointer px-6 pt-5 text-lg text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              About CinemaHub
            </p>
            <p className="cursor-pointer px-6 pt-5 text-lg text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              For Business
            </p>
            <p className="cursor-pointer px-6 pt-5 text-lg text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              Partners
            </p>
            <p className="cursor-pointer px-6 pt-5 text-lg text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              Careers
            </p>
          </div>

          <div>
            <h2 className="md:text-md pt-10 text-xl font-extrabold text-[#555] md:pt-0 lg:pt-0">
              Account
            </h2>
            <Link to={Path.Register}>
              <p className="text-md px-6 pt-5 text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
                Create account
              </p>
            </Link>
            <Link to={Path.Login}>
              <p className="text-md px-6 pt-5 text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
                Sign in
              </p>
            </Link>
            <p className="text-md px-6 pt-5 text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              iOS app
            </p>
            <p className="text-md px-6 pt-5 text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              Android app
            </p>
          </div>

          <div>
            <h2 className="md:text-md pt-10 text-xl font-extrabold text-[#555] md:pt-0 lg:pt-0">
              Resources
            </h2>
            <p className="text-md cursor-pointer px-6 pt-5 text-[#bbbbbb] hover:text-[#767676] lg:px-12 lg:text-xl">
              Help center
            </p>
            <p className="text-md cursor-pointer px-6 pb-10 pt-5 text-[#bbbbbb] hover:text-[#767676] md:pb-0 lg:px-12 lg:pb-0 lg:text-xl">
              Privacy & terms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
