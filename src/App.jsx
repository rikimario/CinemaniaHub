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
  };

  const closeLogin = () => {
    setLoginVisible(false);
  };

  const toggleRegister = () => {
    setRegisterVisible(!registerVisible);
  };

  const closeRegister = () => {
    setRegisterVisible(false);
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
      {loginVisible && <Login isVisible closeLogin={closeLogin} />}
      {registerVisible && <Register isVisible closeRegister={closeRegister} />}
    </>
  );
}

export default App;
