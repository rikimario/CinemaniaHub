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
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  const logout = async () => {
    try {
      await axios.get("/logout");
      console.log("Logged out successfully");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     axios.get("/profile").then(({ data }) => {
  //       setUser(data);
  //       localStorage.setItem("user", JSON.stringify(data));
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (!user && storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);
  // const logout = () => {
  //   axios
  //     .get("/logout")
  //     .then(() => {
  //       console.log("Logged out successfully");
  //       console.log("user", user);
  //       setUser(null);
  //       localStorage.removeItem("user");
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error);
  //     });
  // };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
