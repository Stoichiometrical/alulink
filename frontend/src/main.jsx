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
import Home from "./pages/home/Home.jsx";
import AlumniDash from "./pages/dashboard/AlumniDash.jsx";
import ByMe from "./pages/dashboard/alumni/ByMe.jsx";
import Attending from "./pages/dashboard/alumni/Attending.jsx";
import Collaborating from "./pages/dashboard/alumni/Collaborating.jsx";
import AlumniEvents from './pages/dashboard/admin/AlumniEvents.jsx'
import Records from "./pages/dashboard/admin/Records.jsx";
import Usage from './pages/dashboard/admin/Usage.jsx'
import AdminDash from "./pages/dashboard/AdminDash.jsx";
import { AuthProvider, useAuth } from '/src/utils/AuthContext.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
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
    path: "/userdashs",
    element: <App />,
  },
  {
     path:'/userdash',
     element:<Attending/>,
    
  },
  {
    path:'byme',
    element:<ByMe/>,
  },
  {
    path:'attending',
    element:<Attending/>,
  },
  {
    path:'collaborating',
    element:<Collaborating/>,
  },
  {
    path: "/admindash",
    element: <AlumniEvents/>,
  },
  {
    path:'/alumnievents',
    element:<AlumniEvents/>
  },
  {
    path:'/records',
    element:<Records/>
  },
  {
    path:'/usage',
    element:<Usage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    
  </React.StrictMode>
);
