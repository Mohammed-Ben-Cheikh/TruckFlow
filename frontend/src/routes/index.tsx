import { createRouter } from "router-kit";
import Home from "../page/Admin/Home";
import AdminDashboardLayout from "../page/Admin/layout";
import LinePage from "../page/Admin/Line";
import MaintenancePage from "../page/Admin/Maintenance";
import TirePage from "../page/Admin/Tire";
import TrackingPage from "../page/Admin/Tracking";
import TrailerPage from "../page/Admin/Trailer";
import TruckPage from "../page/Admin/Truck";
import UsersPage from "../page/Admin/Users";
import Login from "../page/Auth/Login";
import DriverHome from "../page/Driver/Home";
import DriverDashboardLayout from "../page/Driver/layout";
import DriverLine from "../page/Driver/Line";

const authMiddleware = async (role: string): Promise<boolean | string> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "login";

    const res = await fetch("http://localhost:3000/api/auth/verify-jwt", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return "login";
    
    const data = await res.json();
    return data.data.user.role === role;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return "login";
  }
};
const routes = createRouter([
  {
    path: "/login",
    component: <Login />,
    errorElement: <div>Error loading login</div>,
  },
  {
    path: "/",
    component: <AdminDashboardLayout />,
    guard: () => authMiddleware("admin"),
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
      {
        path: "users",
        component: <UsersPage />,
      },
    ],
  },
  {
    path: "/",
    component: <DriverDashboardLayout />,
    guard: () => authMiddleware("employé"),
    children: [
      {
        index: true,
        component: <DriverHome />,
      },
      {
        path: "/lines",
        component: <DriverLine />,
      },
    ],
  },
]);

export default routes;
