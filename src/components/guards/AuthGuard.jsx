import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Path from "@/paths/paths";

export default function AuthGuard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      if (location.pathname.startsWith(Path.Profile)) {
        navigate(Path.Login);
      }
    } else if (
      location.pathname === Path.Login ||
      location.pathname === Path.Register
    ) {
      navigate(Path.Home);
    }
  }, [user, navigate, location]);

  return <Outlet />;
}
