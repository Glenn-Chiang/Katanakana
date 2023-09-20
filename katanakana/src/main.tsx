import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dojo from "./features/dojo/Dojo.tsx";
import Scrolls from "./features/scrolls/Scrolls.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dojo",
    element: <Dojo />,
  },
  {
    path: "/scrolls",
    element: <Scrolls />,
  },
  {
    path: "/scores",
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
