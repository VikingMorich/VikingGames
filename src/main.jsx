import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Home } from "./views/Home/Home.jsx";
import { Games } from "./views/Games/Games.jsx";
import { User } from "./views/User/User.jsx";
import { Login } from "./views/Login/Login.jsx";
import { Shop } from "./views/Shop/Shop.jsx";
import { Scores } from "./views/Scores/Scores.jsx";
import { Valhalla } from "./views/Valhalla/Valhalla.jsx";
import { AdminGames } from "./views/AdminGames/AdminGames.jsx";
import { AdminShop } from "./views/AdminShop/AdminShop.jsx";
import { Countdown } from "./views/Countdown/CountDown.jsx";
import { Page404 } from "./views/Page404/Page404.jsx";
import "./common.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/countdown",
    element: <Countdown />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/scores",
    element: <Scores />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/valhalla",
    element: <Valhalla />,
  },
  {
    path: "/admingames",
    element: <AdminGames />,
  },
  {
    path: "/adminshop",
    element: <AdminShop />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
