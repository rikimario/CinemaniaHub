import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     axios.get("/profile").then(({ data }) => {
  //       setUser(data);
  //       localStorage.setItem("user", JSON.stringify(data));
  //     });
  //   }
  // }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/profile");
        if (data && data.email) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, []);

  const logout = () => {
    axios
      .get("/logout")
      .then(() => {
        console.log("Logged out successfully");
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
