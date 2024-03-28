import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./components/home/Home";
import Navigation from "./components/Navigation";
import Path from "./paths/paths";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";

function App() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
    closeRegister(true);
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
    closeLogin(true);
  };

  const closeRegister = () => {
    setRegisterVisible(false);
  };

  const handleCloseRegister = (e) => {
    if (e.target.id === "register") {
      closeRegister();
    }
  };

  return (
    <>
      <Navigation toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
      <Routes>
        <Route
          path={Path.Home}
          element={
            <Home
              loginVisible={loginVisible}
              registerVisible={registerVisible}
            />
          }
        />
      </Routes>
      {loginVisible && (
        <Login
          isVisible
          closeLogin={closeLogin}
          handleCloseLogin={handleCloseLogin}
        />
      )}
      {registerVisible && (
        <Register
          isVisible
          closeRegister={closeRegister}
          handleCloseRegister={handleCloseRegister}
        />
      )}
    </>
  );
}

export default App;
