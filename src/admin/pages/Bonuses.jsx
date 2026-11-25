import {
  Gift,
  Users,
  Clock,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

function Bonuses() {
  return (
    <div className="admin-deposits-page">
      <div className="admin-page-heading">
        <div>
          <h1>Bonuses Management</h1>
          <p>Monitor promotional bonuses and user rewards.</p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="admin-deposit-stats">
        <div className="admin-stat-card">
          <Gift size={20} />
          <span>Total Bonuses</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <Users size={20} />
          <span>Users Rewarded</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <CheckCircle size={20} />
          <span>Active Bonuses</span>
          <h2>—</h2>
        </div>
      </div>

      <div className="admin-deposits-list">
        <div className="admin-empty-state">
          <Clock size={36} />

          <h3>No bonus records yet</h3>

          <p>
            Bonus campaigns and user reward records will
            appear here once the bonus management system
            is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bonuses;