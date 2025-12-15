import type { ReactNode } from "react";
import Sidebar, { type NavItem } from "../ui/Sidebar";

type DashboardLayoutProps = {
  navItems: NavItem[];
  children: ReactNode;
  header?: ReactNode;
  sidebarFooter?: ReactNode;
};

const DashboardLayout = ({
  navItems,
  children,
  header,
  sidebarFooter,
}: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar items={navItems} footer={sidebarFooter} />
      <main className="flex-1">
        {header && (
          <div className="border-b bg-white h-[10vh] px-6 py-4 flex items-center justify-between">
            {header}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
