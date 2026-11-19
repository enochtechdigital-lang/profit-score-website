import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  ShieldAlert,
  Network,
  QrCode,
} from "lucide-react";

const networks = [
  { id: "bitcoin", name: "Bitcoin Network (BTC)" },
  { id: "ethereum", name: "Ethereum (ERC20)" },
  { id: "bsc", name: "BNB Smart Chain (BEP20)" },
  { id: "tron", name: "TRON (TRC20)" },
  { id: "solana", name: "Solana Network" },
];

function DepositDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const coin = location.state;

  const [selectedNetwork, setSelectedNetwork] = useState("");

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

  const handleCopyAddress = async () => {
    alert("Deposit address has not been configured yet.");
  };

  return (
    <div className="deposit-page">

      {/* Heading */}
      <div className="deposit-heading">
        <button onClick={() => navigate("/deposit")}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{coin.symbol} Deposit</h1>
          <p>Deposit cryptocurrency into your wallet.</p>
        </div>
      </div>

      {/* Selected Coin */}
      <div className="deposit-coin-card">
        <div className="deposit-asset-icon">
          {coin.symbol.slice(0, 1)}
        </div>

        <div>
          <h2>{coin.coinName}</h2>
          <p>{coin.symbol}</p>
        </div>
      </div>

      {/* Network Selection */}
      <section className="deposit-network-card">

        <div className="deposit-section-heading">
          <Network size={20} />
          <h3>Select Network</h3>
        </div>

        <p>
          Select the blockchain network you intend to use.
        </p>

        <select
          value={selectedNetwork}
          onChange={(e) => setSelectedNetwork(e.target.value)}
        >
          <option value="">Choose a network</option>

          {networks.map((network) => (
            <option key={network.id} value={network.id}>
              {network.name}
            </option>
          ))}
        </select>

        <small>
          Network options are illustrative for this interface preview.
          Actual supported networks have not been configured.
        </small>

      </section>

      {/* Deposit Address */}
      <section className="deposit-address-card">

        <h3>Deposit Address</h3>

        {!selectedNetwork ? (
          <div className="deposit-empty-state">
            <Network size={30} />
            <p>Select a network to continue.</p>
          </div>
        ) : (
          <>
            <div className="selected-network-label">
              Selected network:{" "}
              {networks.find(
                (network) => network.id === selectedNetwork
              )?.name}
            </div>

            <div className="deposit-qr-placeholder">
              <QrCode size={45} />
              <p>QR code will appear here</p>
            </div>

            <div className="address-placeholder">
              Deposit address will appear here
            </div>

            <button
              className="copy-address-button"
              onClick={handleCopyAddress}
              disabled
            >
              <Copy size={17} />
              Copy Address
            </button>

            <p className="address-status">
              Deposit address not configured yet.
            </p>

            <div className="deposit-memo-notice">
              <strong>Memo / Destination Tag</strong>
              <p>
                Not configured. Some cryptocurrencies require an
                additional memo or destination tag.
              </p>
            </div>
          </>
        )}

      </section>

      {selectedNetwork && (
  <button
    className="deposit-submit-button"
    onClick={() =>
      navigate("/deposit/submit", {
        state: {
          ...coin,
          networkName: networks.find(
            (network) => network.id === selectedNetwork
          )?.name,
          networkId: selectedNetwork,
        },
      })
    }
  >
    I've Sent My Crypto
  </button>
)}

      {/* Safety Notice */}
      <div className="deposit-warning">
        <ShieldAlert size={22} />

        <div>
          <strong>Important Safety Notice</strong>

          <p>
            Always confirm that the cryptocurrency and network
            match the sending platform. Sending funds through an
            unsupported network may result in permanent loss.
          </p>
        </div>
      </div>

      <p className="wallet-demo-notice">
        DEMO MODE: Cryptocurrency deposits are not yet enabled
        on Profit Score.
      </p>

    </div>
  );
}

export default DepositDetails;