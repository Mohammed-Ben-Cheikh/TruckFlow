import { createRouter } from "router-kit";
import Home from "../page/Admin/Home";
import AdminDashboardLayout from "../page/Admin/layout";
import LinePage from "../page/Admin/Line";
import MaintenancePage from "../page/Admin/Maintenance";
import TirePage from "../page/Admin/Tire";
import TrackingPage from "../page/Admin/Tracking";
import TrailerPage from "../page/Admin/Trailer";
import TruckPage from "../page/Admin/Truck";
import Login from "../page/Auth/Login";
import DriverHome from "../page/Driver/Home";
import DriverDashboardLayout from "../page/Driver/layout";

const routes = createRouter([
  {
    path: "/login",
    component: <Login />,
    errorElement: <div>Error loading login</div>,
  },
  {
    path: "/",
    component: <AdminDashboardLayout />,
    errorElement: <div>Error loading admin home</div>,
    loading: <div>Loading admin home...</div>,
    guard: async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      console.log(await res.json());
      // Example guard logic for admin routes
      const isAdmin = true; // Replace with actual authentication logic
      return isAdmin || "/login";
    },
    children: [
      {
        index: true,
        component: <Home />,
      },
      {
        path: "trucks",
        component: <TruckPage />,
      },
      {
        path: "trailers",
        component: <TrailerPage />,
      },
      {
        path: "tires",
        component: <TirePage />,
      },
      {
        path: "lines",
        component: <LinePage />,
      },
      {
        path: "maintenance",
        component: <MaintenancePage />,
      },
      {
        path: "tracking",
        component: <TrackingPage />,
      },
    ],
    // guard: () => {
    //   // Example guard logic for admin routes
    //   const isAdmin = false; // Replace with actual authentication logic
    //   return isAdmin || "/login";
    // }
  },
  {
    path: "/",
    component: <DriverDashboardLayout />,
    children: [
      {
        index: true,
        component: <DriverHome />,
      },
    ],
  },
]);

export default routes;
