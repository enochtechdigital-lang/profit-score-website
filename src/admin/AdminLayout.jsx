import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Gift,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Overview", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Deposits", path: "/admin/deposits", icon: ArrowDownToLine },
  { name: "Withdrawals", path: "/admin/withdrawals", icon: ArrowUpFromLine },
  { name: "Trades", path: "/admin/trades", icon: ArrowLeftRight },
  { name: "Bonuses", path: "/admin/bonuses", icon: Gift },
  { name: "Email Management", path: "/admin/emails", icon: Mail },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <h2>PROFIT <span>SCORE</span></h2>
          <p>ADMIN PANEL</p>
        </div>

        <nav className="admin-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  isActive ? "admin-nav-link active" : "admin-nav-link"
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          className="admin-logout"
          onClick={() => {
            alert("Admin logout will be connected to authentication later.");
          }}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <button
            className="admin-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle admin menu"
          >
            {sidebarOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <div>
            <h3>Admin</h3>
            <p>Manage your Profit Score platform</p>
          </div>

          <div className="admin-profile">
            <span>Levi</span>
            <div>
              <strong>Administrator</strong>
              <small>Admin Account</small>
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
