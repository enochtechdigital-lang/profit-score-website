import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from "lucide-react";

function History() {
  const [activeTab, setActiveTab] = useState("All");

  const transactions = [];

  return (
    <div className="history-page">
      <div className="page-heading">
        <h2>Transaction History</h2>
        <p>Track all your activities on Profit Score.</p>
      </div>

      <div className="history-tabs">
        {["All", "Deposits", "Withdrawals", "Trades"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="history-list">
        {transactions.length === 0 ? (
          <div className="empty-history">
            <ArrowLeftRight size={35} />
            <h3>No transactions yet</h3>
            <p>Your deposits, withdrawals and trades will appear here.</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id}>
              {transaction.type}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;