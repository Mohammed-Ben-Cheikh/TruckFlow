import { createRouter } from "router-kit";
import Validate from "../page/auth/validate";

const routes = createRouter([
  {
    path: "/",
    component: <h1>Welcome to TruckFlow</h1>,
  },
  {
    path: "/auth/validate",
    component: <Validate />,
  },
]);

export default routes;
