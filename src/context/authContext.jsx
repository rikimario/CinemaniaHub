import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  const closeLogin = () => {
    setLoginVisible(false);
  };

  const handleCloseLogin = (e) => {
    if (e.target.id === "login") {
      closeLogin();
    }
  };

  const toggleRegister = () => {
    setRegisterVisible(!registerVisible);
  };

  const closeRegister = () => {
    setRegisterVisible(false);
  };

  const handleCloseRegister = (e) => {
    if (e.target.id === "register") {
      closeRegister();
    }
  };

  const values = {
    toggleLogin,
    closeLogin,
    handleCloseLogin,
    toggleRegister,
    closeRegister,
    handleCloseRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

AuthContext.displayName = "AuthContext";

export default AuthContext;
