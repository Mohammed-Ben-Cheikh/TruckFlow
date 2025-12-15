import { Outlet } from "router-kit";
import { DashboardLayout, type NavItem } from "../../../components";

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/" },
  { label: "Camions", href: "/trucks", badge: "new" },
  { label: "Remorques", href: "/trailers", badge: "12" },
  { label: "Pneus", href: "/tires" },
  { label: "Lignes", href: "/lines" },
  { label: "Maintenance", href: "/maintenance", badge: "3" },
  { label: "Suivi", href: "/tracking" },
  { label: "Utilisateurs", href: "/users" },
];

const AdminDashboardLayout = () => {
  return (
    <DashboardLayout navItems={navItems}>
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboardLayout;
