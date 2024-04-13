import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { AuthContextProvider } from "./context/authContext.jsx";
import { StorageContextProvider } from "./context/storageContext.jsx";
import { Toaster } from "react-hot-toast";

import Home from "./components/home/Home";
import Navigation from "./components/Navigation";
import Path from "./paths/paths";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Discovery from "./components/discovery/Discovery.jsx";
import Profile from "./components/profile/Profile.jsx";
import MovieDetails from "./components/movie-details/MovieDetails.jsx";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

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
    <AuthContextProvider>
      <StorageContextProvider>
        <Navigation toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
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
          <Route path={Path.Profile} element={<Profile />} />
          <Route path={Path.Discovery} element={<Discovery />} />
          <Route path={`${Path.MovieDetails}/:id`} element={<MovieDetails />} />
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
      </StorageContextProvider>
    </AuthContextProvider>
  );
}

export default App;
