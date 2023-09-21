import App from "./App.tsx";
import Game from "./features/game/Game.tsx";
import Review from "./features/review/Review.tsx";
import Scrolls from "./features/scrolls/Scrolls.tsx";
import { createBrowserRouter } from "react-router-dom";

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
    path: "/dojo/review",
    element: <Review />,
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
