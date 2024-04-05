import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./components/home/Home";
import Navigation from "./components/Navigation";
import Path from "./paths/paths";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Discovery from "./components/discovery/Discovery.jsx";

function App() {
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
        <Route path={Path.Discovery} element={<Discovery />} />
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
