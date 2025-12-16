import { useState, type ReactNode } from "react";
import { Link, useLocation, useRouter } from "router-kit";

export type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: string;
};

type SidebarProps = {
  logo?: ReactNode;
  items: NavItem[];
  collapsed?: boolean;
};

const Sidebar = ({ logo, items, collapsed = false }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { navigate } = useRouter();

  return (
    <>
      <button
        type="button"
        aria-expanded={mobileOpen}
        className="fixed right-4 bottom-4 z-50 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow md:hidden"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        Menu
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full min-w-60 flex-col border-r bg-white shadow-sm transition-transform duration-200 md:static md:h-screen ${
          collapsed ? "md:w-20" : "md:w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 border-b px-4 py-4">
          {logo && (
            <div className="text-xl font-bold text-blue-600">{logo}</div>
          )}
          {!collapsed && (
            <span className="text-sm font-semibold">TruckFlow</span>
          )}
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
                    onClick={() => setMobileOpen(false)}
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

        <div className="border-t px-4 py-3">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
