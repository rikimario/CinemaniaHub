import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  const logout = () => {
    // Perform logout actions here, such as clearing user data and tokens
    setUser(); // Assuming clearing user data
    axios
      .get("/logout")
      .then(() => {
        // Assuming logout API endpoint clears server-side session
        console.log("Logged out successfully");
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
