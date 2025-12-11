import { createRouter } from "router-kit";
import Home from "../page/dashboard/home";

const routes = createRouter([{ path: "/", component: <Home /> }]);

export default routes;
