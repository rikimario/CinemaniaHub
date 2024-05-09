import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { Toaster } from "react-hot-toast";

import Home from "./components/home/Home";
import Navigation from "./components/navigation/Navigation.jsx";
import Path from "./paths/paths";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Profile from "./components/profile/Profile.jsx";
import MovieDetails from "./components/movie-details/MovieDetails.jsx";
import AuthGuard from "./components/guards/AuthGuard.jsx";
import NotFound from "./components/not-found/NotFound.jsx";
import Footer from "./components/footer/Footer.jsx";
import TvDetails from "./components/TV/tv-details/TvDetails.jsx";

import axios from "axios";

axios.defaults.baseURL =
  "https://cinema-hub-git-main-marios-projects-624972af.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Navigation />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path={`${Path.MovieDetails}/:id`} element={<MovieDetails />} />
        <Route path={`${Path.TvDetails}/:id`} element={<TvDetails />} />

        <Route element={<AuthGuard />}>
          <Route path={Path.Login} element={<Login />} />
          <Route path={Path.Register} element={<Register />} />
          <Route path={`${Path.Profile}/:username`} element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
