import { createRouter } from "router-kit";
import Validate from "../page/auth/validate";
import Home from "../page/dashboard/home";

const routes = createRouter([
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/auth/validate",
    component: <Validate />,
  },
  {
    path: "/auth/error",
    component: <h1>Authentication Error</h1>,
  },
]);

export default routes;
