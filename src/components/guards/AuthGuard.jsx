import { AuthContext } from "@/context/authContext";
import Path from "@/paths/paths";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AuthGuard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      if (location.pathname.startsWith(Path.Profile)) {
        navigate(Path.Login);
      }
    } else if (location.pathname === Path.Login) {
      navigate(Path.Home);
    }
  }, [user, navigate, location]);

  return <Outlet />;
}
