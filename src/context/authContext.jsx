import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      });
    }
  }, [user]);

  const logout = () => {
    axios
      .get("/logout")
      .then(() => {
        console.log("Logged out successfully");
        console.log("user", user);
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
