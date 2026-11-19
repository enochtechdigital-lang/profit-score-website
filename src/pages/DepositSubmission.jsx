import { submitDeposit } from "../services/depositService";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, ShieldCheck } from "lucide-react";

function DepositSubmission() {
  const navigate = useNavigate();
  const location = useLocation();

  const deposit = location.state;

  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");

  if (!deposit) {
    return (
      <div className="deposit-page">
        <h2>Deposit information unavailable</h2>
        <button onClick={() => navigate("/deposit")}>
          Start Deposit
        </button>
      </div>
    );
  }

 function handleSubmit(e) {
  e.preventDefault();

  if (!amount || !Number.isFinite(Number(amount)) || Number(amount) <= 0) {
    setMessage("Please enter a valid deposit amount.");
    return;
  }

  if (!transactionHash.trim()) {
    setMessage("Please enter your transaction hash.");
    return;
  }

  try {
    const newDeposit = submitDeposit({
      ...deposit,
      amount,
      transactionHash,
      receiptName: receipt?.name || null,
    });

    setMessage(
      `Deposit submitted successfully! Reference: ${newDeposit.id}. Status: Pending Verification.`
    );

    setAmount("");
    setTransactionHash("");
    setReceipt(null);

  } catch (error) {
    console.error("Deposit submission error:", error);
    setMessage("Unable to save your deposit. Please try again.");
  }
}

  return (
    <div className="deposit-page">

      <div className="deposit-heading">
        <button onClick={() => navigate("/deposit/details", {
          state: deposit,
        })}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>Submit Deposit</h1>
          <p>Provide your transaction details.</p>
        </div>
      </div>

      <div className="deposit-coin-card">
        <div className="deposit-asset-icon">
          {deposit.symbol?.slice(0, 1)}
        </div>

        <div>
          <h2>{deposit.coinName}</h2>
          <p>{deposit.symbol}</p>
        </div>
      </div>

      <form className="deposit-submission-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Network</label>
          <input
            type="text"
            value={deposit.networkName || "Not specified"}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Amount Deposited</label>
          <input
            type="number"
            min="0"
            step="any"
            placeholder={`Enter ${deposit.symbol} amount`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Transaction Hash (TXID)</label>
          <input
            type="text"
            placeholder="Enter transaction hash"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value.trim())}
          />
        </div>

        <div className="form-group">
          <label>Upload Payment Evidence (Optional)</label>

          <label className="deposit-upload">
            <Upload size={20} />
            <span>
              {receipt ? receipt.name : "Choose screenshot"}
            </span>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setReceipt(e.target.files[0] || null)}
            />
          </label>
        </div>

        <div className="deposit-verification-notice">
          <ShieldCheck size={20} />
          <p>
            Your submission will require verification before any
            funds can be credited to your wallet.
          </p>
        </div>

        {message && (
          <p className="deposit-form-message" role="status">
            {message}
          </p>
        )}

        <button type="submit" className="deposit-submit-button">
          Submit Deposit
        </button>

      </form>

      <p className="wallet-demo-notice">
        DEMO MODE: This form does not submit a real transaction
        or credit your wallet.
      </p>

    </div>
  );
}

export default DepositSubmission;