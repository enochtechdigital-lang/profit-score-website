import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, ShieldAlert } from "lucide-react";

function DepositDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const coin = location.state;

  if (!coin) {
    return (
      <div className="deposit-page">
        <h2>Deposit asset not selected</h2>
        <button onClick={() => navigate("/deposit")}>
          Select Cryptocurrency
        </button>
      </div>
    );
  }

  return (
    <div className="deposit-page">

      <div className="deposit-heading">
        <button onClick={() => navigate("/deposit")}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{coin.symbol} Deposit</h1>
          <p>Deposit cryptocurrency into your wallet.</p>
        </div>
      </div>

      <div className="deposit-coin-card">
        <div className="deposit-asset-icon">
          {coin.symbol.slice(0, 1)}
        </div>

        <div>
          <h2>{coin.coinName}</h2>
          <p>{coin.symbol}</p>
        </div>
      </div>

      <section className="deposit-address-card">

        <h3>Deposit Address</h3>

        <div className="deposit-qr-placeholder">
          QR code will appear here
        </div>

        <div className="address-placeholder">
          Deposit address will appear here
        </div>

        <button className="copy-address-button" disabled>
          <Copy size={17} />
          Copy Address
        </button>

        <p className="address-status">
          Deposit address not configured yet.
        </p>

      </section>

      <div className="deposit-warning">
        <ShieldAlert size={20} />

        <div>
          <strong>Important Safety Notice</strong>

          <p>
            Do not transfer funds until your deposit address
            and supported network have been configured and verified.
          </p>
        </div>
      </div>

    </div>
  );
}

export default DepositDetails;