import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Game from "./features/game/Game.tsx";
import Scrolls from "./features/scrolls/Scrolls.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dojo",
    element: <Game />,
  },  
  {
    path: "/scrolls",
    element: <Scrolls />,
  },
  {
    path: "/scores",
  },
]);

export default router;
