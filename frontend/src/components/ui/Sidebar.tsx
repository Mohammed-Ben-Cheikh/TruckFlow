import type { ReactNode } from "react";
import { Link, useRouter } from "router-kit";

export type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
};

type SidebarProps = {
  logo?: ReactNode;
  items: NavItem[];
  footer?: ReactNode;
  collapsed?: boolean;
};

const Sidebar = ({ logo, items, footer, collapsed = false }: SidebarProps) => {
  const { location } = useRouter();

  return (
    <aside
      className={`flex h-screen min-w-[240px] flex-col border-r bg-white shadow-sm ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center gap-3 border-b px-4 py-4">
        {logo && <div className="text-xl font-bold text-blue-600">{logo}</div>}
        {!collapsed && <span className="text-sm font-semibold">TruckFlow</span>}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive =
              location.pathname === item.href ||
              location.pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.icon && <span className="text-lg">{item.icon}</span>}
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="rounded-full bg-slate-900 px-2 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {footer && <div className="border-t px-4 py-3">{footer}</div>}
    </aside>
  );
};

export default Sidebar;
