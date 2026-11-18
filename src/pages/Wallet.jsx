import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  Download,
} from "lucide-react";

import { getCryptoPrices } from "../services/cryptoService";

function Wallet() {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo balances: all assets start at zero
  const balances = {
    binancecoin: 0,
    tether: 0,
    "bitcoin-cash": 0,
    solana: 0,
    bitcoin: 0,
    ripple: 0,
    ethereum: 0,
    litecoin: 0,
    "usd-coin": 0,
  };

  useEffect(() => {
    async function loadWalletPrices() {
      try {
        const data = await getCryptoPrices();
        setCoins(data);
      } catch (error) {
        console.error("Wallet prices error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWalletPrices();

    const interval = setInterval(loadWalletPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatNGN = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  const totalBalance = coins.reduce((total, coin) => {
    return total + (balances[coin.id] ?? 0) * (coin.current_price ?? 0);
  }, 0);

  const handleAction = (action) => {
    alert(`${action} is currently available in demo mode only.`);
  };

  return (
    <div className="wallet-page">

      {/* Page Heading */}
      <div className="wallet-heading">
        <div>
          <h1>My Wallet</h1>
          <p>Manage your cryptocurrency assets.</p>
        </div>

        <span className="demo-badge">DEMO</span>
      </div>

      {/* Total Balance */}
      <section className="wallet-balance-card">

        <div className="wallet-balance-heading">
          <span>Total Wallet Balance</span>

          <button
            onClick={() => setShowBalance(!showBalance)}
            aria-label="Toggle balance visibility"
          >
            {showBalance ? <Eye size={19} /> : <EyeOff size={19} />}
          </button>
        </div>

        <h1>
          {showBalance
            ? loading
              ? "Loading..."
              : formatNGN(totalBalance)
            : "••••••••"}
        </h1>

        <p>Estimated value of your crypto assets</p>

      </section>

      {/* Wallet Actions */}
      <section className="wallet-actions">

        <button onClick={() => navigate("/deposit")}>
          <ArrowDownToLine size={21} />
          <span>Deposit</span>
        </button>

        <button onClick={() => handleAction("Withdraw")}>
          <ArrowUpFromLine size={21} />
          <span>Withdraw</span>
        </button>

        <button onClick={() => handleAction("Send")}>
          <Send size={21} />
          <span>Send</span>
        </button>

        <button onClick={() => handleAction("Receive")}>
          <Download size={21} />
          <span>Receive</span>
        </button>

      </section>

      {/* Assets */}
      <section className="wallet-assets">

        <div className="wallet-assets-heading">
          <h2>My Assets</h2>
          <span>{coins.length} Assets</span>
        </div>

        {loading && <p className="wallet-message">Loading assets...</p>}

        {!loading && coins.map((coin) => {
          const quantity = balances[coin.id] ?? 0;
          const value = quantity * (coin.current_price ?? 0);

          return (
            <div className="wallet-asset-item" key={coin.id}>

              <div className="wallet-asset-info">
                <img src={coin.image} alt={coin.name} />

                <div>
                  <h3>{coin.name}</h3>
                  <p>{coin.symbol.toUpperCase()}</p>
                </div>
              </div>

              <div className="wallet-asset-balance">
                <h3>
                  {quantity} {coin.symbol.toUpperCase()}
                </h3>

                <p>{formatNGN(value)}</p>
              </div>

            </div>
          );
        })}

      </section>

      <p className="wallet-demo-notice">
        Demo wallet: balances are simulated and do not represent real funds.
      </p>

    </div>
  );
}

export default Wallet;