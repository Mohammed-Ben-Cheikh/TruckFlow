import { Outlet } from "router-kit";
import { DashboardLayout, type NavItem } from "../../../components";

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/" },
  { label: "Lignes", href: "/lines" },
];

const DriverDashboardLayout = () => {
  return (
    <DashboardLayout navItems={navItems}>
      <Outlet />
    </DashboardLayout>
  );
};

export default DriverDashboardLayout;
