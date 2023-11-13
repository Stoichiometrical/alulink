import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/signup/SignIn.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import HomeHero from "./components/hero/HomeHero.jsx";
import Events from "./pages/events/Events.jsx";
import About from "./pages/about/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeHero/>,
  },
  {
    path: "/events",
    element: <Events/>,
  },
  {
    path: "/login",
    element: <SignIn/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/userdash",
    element: <App />,
  },
  {
    path: "/admindash",
    element: "",
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
