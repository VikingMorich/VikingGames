import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { Login } from "./views/Login/Login.jsx";
import { Home } from "./views/Home/Home.jsx";
import { Games } from "./views/Games/Games.jsx";
import { Page404 } from "./views/Page404/Page404.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
