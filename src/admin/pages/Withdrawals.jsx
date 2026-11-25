import { useState } from "react";
import {
  ArrowUpFromLine,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

function Withdrawals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "Approved",
    "Rejected",
  ];

  return (
    <div className="admin-deposits-page">
      <div className="admin-page-heading">
        <div>
          <h1>Withdrawals</h1>
          <p>Review and manage users' withdrawal requests.</p>
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
          <Clock size={20} />
          <span>Pending Requests</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <CheckCircle size={20} />
          <span>Approved</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <XCircle size={20} />
          <span>Rejected</span>
          <h2>—</h2>
        </div>
      </div>

      <div className="admin-deposits-toolbar">
        <div className="admin-search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by user, coin or transaction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-deposit-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter ? "active" : ""
              }
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-deposits-list">
        <div className="admin-empty-state">
          <ArrowUpFromLine size={36} />
          <h3>No withdrawal requests yet</h3>
          <p>
            Withdrawal requests submitted by users will
            appear here when the withdrawal system is connected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Withdrawals;