import {
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  Clock,
  Activity,
} from "lucide-react";

const statistics = [
  {
    title: "Total Users",
    value: "0",
    note: "Registered accounts",
    icon: Users,
  },
  {
    title: "Total Deposits",
    value: "₦0.00",
    note: "Deposits received",
    icon: ArrowDownToLine,
  },
  {
    title: "Total Withdrawals",
    value: "₦0.00",
    note: "Withdrawal requests",
    icon: ArrowUpFromLine,
  },
  {
    title: "Trading Volume",
    value: "₦0.00",
    note: "Total trading activity",
    icon: TrendingUp,
  },
];

function AdminOverview() {
  return (
    <div className="admin-overview">
      <div className="admin-page-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome to your Profit Score administration panel.</p>
        </div>

        <span className="admin-live-badge">
          <span></span> Admin Panel
        </span>
      </div>

      <div className="admin-stat-grid">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.title}>
              <div className="admin-stat-top">
                <span>{stat.title}</span>
                <Icon size={22} />
              </div>

              <h3>{stat.value}</h3>
              <p>{stat.note}</p>
            </div>
          );
        })}
      </div>

      <div className="admin-overview-grid">
        <section className="admin-panel-card">
          <div className="admin-panel-heading">
            <h3>Recent Activity</h3>
            <Activity size={20} />
          </div>

          <div className="admin-empty-state">
            <Clock size={30} />
            <h4>No activity yet</h4>
            <p>Platform activities will appear here when connected to the backend.</p>
          </div>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-heading">
            <h3>Pending Actions</h3>
            <Clock size={20} />
          </div>

          <div className="admin-pending-item">
            <span>Pending deposits</span>
            <strong>0</strong>
          </div>

          <div className="admin-pending-item">
            <span>Pending withdrawals</span>
            <strong>0</strong>
          </div>

          <div className="admin-pending-item">
            <span>Pending user reviews</span>
            <strong>0</strong>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminOverview;