import { useEffect, useState } from "react";
import {
  ArrowDownToLine,
  RefreshCw,
  Clock,
  Search,
} from "lucide-react";

import { getDeposits } from "../../services/depositService";

function Deposits() {
  const [deposits, setDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  function loadDeposits() {
    setDeposits(getDeposits());
  }

  useEffect(() => {
    loadDeposits();

    window.addEventListener("storage", loadDeposits);

    return () => {
      window.removeEventListener("storage", loadDeposits);
    };
  }, []);

  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch =
      `${deposit.coinName} ${deposit.symbol} ${deposit.transactionHash}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      deposit.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-deposits-page">

      <div className="admin-page-heading">
        <div>
          <h2>Deposit Management</h2>
          <p>Review cryptocurrency deposit submissions.</p>
        </div>

        <button
          className="admin-refresh-button"
          onClick={loadDeposits}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="admin-stat-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span>Total Submissions</span>
            <ArrowDownToLine size={22} />
          </div>
          <h3>{deposits.length}</h3>
          <p>All submitted deposits</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-top">
            <span>Pending Verification</span>
            <Clock size={22} />
          </div>
          <h3>
            {deposits.filter(
              (deposit) => deposit.status === "Pending Verification"
            ).length}
          </h3>
          <p>Awaiting review</p>
        </div>

      </div>

      <div className="admin-deposits-toolbar">

        <div className="admin-users-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search coin or transaction hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-deposit-filters">
          {["All", "Pending Verification", "Verified", "Rejected"].map(
            (filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "Pending Verification" ? "Pending" : filter}
              </button>
            )
          )}
        </div>

      </div>

      <div className="admin-deposits-list">

        {filteredDeposits.length === 0 ? (
          <div className="admin-users-empty">
            <ArrowDownToLine size={35} />
            <h3>No deposit submissions found</h3>
            <p>
              User deposit submissions will appear here when available.
            </p>
          </div>
        ) : (

          filteredDeposits.map((deposit) => (
            <div className="admin-deposit-card" key={deposit.id}>

              <div className="admin-deposit-top">
                <div>
                  <h3>{deposit.symbol} Deposit</h3>
                  <p>{deposit.coinName}</p>
                </div>

                <span className="admin-deposit-status">
                  {deposit.status}
                </span>
              </div>

              <div className="admin-deposit-details">

                <div>
                  <small>Amount submitted</small>
                  <strong>
                    {deposit.amount} {deposit.symbol}
                  </strong>
                </div>

                <div>
                  <small>Network</small>
                  <strong>{deposit.networkName || "Not specified"}</strong>
                </div>

                <div>
                  <small>Reference</small>
                  <strong>{deposit.id}</strong>
                </div>

                <div>
                  <small>Transaction Hash</small>
                  <strong className="admin-deposit-hash">
                    {deposit.transactionHash}
                  </strong>
                </div>

              </div>

              <div className="admin-deposit-date">
                Submitted: {new Date(deposit.date).toLocaleString()}
              </div>

            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default Deposits;