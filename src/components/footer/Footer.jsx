import Path from "@/paths/paths";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="pt-32">
      <div className="h-96 bg-neutral-900 px-32">
        <div className="grid grid-cols-5 justify-around pt-10 text-center">
          <div className="text-2xl font-bold">
            <div className="flex justify-center text-2xl font-bold">
              <Link to={Path.Home} className="text-[#ffc107]">
                Cinema<span className="text-3xl text-[#ffc107]">Hub</span>
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

            <div className="pt-20 text-base text-[#bbbbbb]">
              Copyright &copy; 2024 by CinemaHub, Inc. All rights reserved
            </div>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#555]">Contact us</h2>
            <p className="text-md px-12 pt-10 text-[#bbbbbb]">
              623 Harrison St., 2nd Floor, San Francisco, CA 94107
            </p>
            <p className="text-md px-12 pt-[3.2rem] text-[#bbbbbb]">
              415-201-6370 hello@cinemahub.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#555]">Company</h2>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              About CinemaHub
            </p>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              For Business
            </p>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              Partners
            </p>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              Careers
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#555]">Account</h2>
            <Link to={Path.Register}>
              <p className="px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
                Create account
              </p>
            </Link>
            <Link to={Path.Login}>
              <p className="px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
                Sign in
              </p>
            </Link>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              iOS app
            </p>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              Android app
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-[#555]">Resources</h2>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              Help center
            </p>
            <p className="cursor-pointer px-12 pt-5 text-xl text-[#bbbbbb] hover:text-[#767676]">
              Privacy & terms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
