import { createRouter, type Middleware } from "router-kit";
import Home from "../page/dashboard/home";

const loggingMiddleware: Middleware = async (context, next) => {
  console.log(`[${new Date().toISOString()}] ${context.pathname}`);
  return next();
};

const routes = createRouter([
  {
    path: "/",
    component: <Home />,
    middleware: [loggingMiddleware],
    errorElement: <div>Error occurred!</div>,
    guard: async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      console.log(await res.json());
      return true;
    },
    meta: { title: "Home Page", description: "Welcome to the Home Page" },
  },
]);

export default routes;
