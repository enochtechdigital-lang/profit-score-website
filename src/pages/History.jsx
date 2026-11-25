import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
} from "lucide-react";

import { getDeposits } from "../services/depositService";

function History() {
  const [activeTab, setActiveTab] = useState("All");
  const [deposits, setDeposits] = useState([]);

  // Load saved deposits
  useEffect(() => {
    function loadDeposits() {
      setDeposits(getDeposits());
    }

    loadDeposits();

    window.addEventListener("storage", loadDeposits);

    return () => {
      window.removeEventListener("storage", loadDeposits);
    };
  }, []);

  // Convert deposits into history transactions
  const transactions = deposits.map((deposit) => ({
    id: deposit.id,
    type: "Deposit",
    coinName: deposit.coinName,
    symbol: deposit.symbol,
    amount: deposit.amount,
    networkName: deposit.networkName,
    transactionHash: deposit.transactionHash,
    status: deposit.status,
    date: deposit.date,
  }));

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "All") return true;
    if (activeTab === "Deposits") return transaction.type === "Deposit";
    if (activeTab === "Withdrawals") return transaction.type === "Withdrawal";
    if (activeTab === "Trades") return transaction.type === "Trade";

    return true;
  });

  function formatDate(date) {
    return new Date(date).toLocaleString();
  }

  return (
    <div className="history-page">

      <div className="page-heading">
        <h2>Transaction History</h2>
        <p>Track all your activities on Profit Score.</p>
      </div>

      {/* History Tabs */}
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

      {/* Transaction List */}
      <div className="history-list">

        {filteredTransactions.length === 0 ? (
          <div className="empty-history">
            <ArrowLeftRight size={35} />
            <h3>No transactions yet</h3>
            <p>
              Your deposits, withdrawals and trades will appear here.
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div className="history-transaction" key={transaction.id}>

              <div className="history-transaction-icon">
                <ArrowDownLeft size={20} />
              </div>

              <div className="history-transaction-info">
                <h3>
                  {transaction.coinName} Deposit
                </h3>

                <p>
                  {transaction.amount} {transaction.symbol}
                </p>

                <small>{transaction.networkName}</small>

                <small>
                  Reference: {transaction.id}
                </small>

                <small>
                  TXID: {transaction.transactionHash}
                </small>

                <small>
                  {formatDate(transaction.date)}
                </small>
              </div>

              <div className="history-transaction-status">
                <span className="pending-status">
                  {transaction.status}
                </span>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default History;