import { useState } from "react";
import {
  ArrowLeftRight,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

function Trades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Buy", "Sell"];

  return (
    <div className="admin-deposits-page">
      <div className="admin-page-heading">
        <div>
          <h1>Trades</h1>
          <p>Monitor trading activities on Profit Score.</p>
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
          <ArrowLeftRight size={20} />
          <span>Total Trades</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <TrendingUp size={20} />
          <span>Buy Orders</span>
          <h2>—</h2>
        </div>

        <div className="admin-stat-card">
          <TrendingDown size={20} />
          <span>Sell Orders</span>
          <h2>—</h2>
        </div>
      </div>

      <div className="admin-deposits-toolbar">
        <div className="admin-search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by user, coin or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-deposit-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-deposits-list">
        <div className="admin-empty-state">
          <Clock size={36} />
          <h3>No trading records yet</h3>
          <p>
            Trading activities will appear here once the
            platform's trading system is connected to the
            backend.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Trades;