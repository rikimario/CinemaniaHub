import { Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Navigation from "./components/Navigation";
import Path from "./paths/paths";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={Path.Home} element={<Home />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.Register} element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
