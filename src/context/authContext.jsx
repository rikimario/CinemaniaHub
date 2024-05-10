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
    axios
      .get("/profile")
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        // Handle error fetching user profile
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    axios
      .get("/logout")
      .then(() => {
        console.log("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        // Handle error logging out
        console.error("Logout failed:", error);
      });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
