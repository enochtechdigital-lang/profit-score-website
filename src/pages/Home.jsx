import { useEffect, useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowDownToLine,
  ArrowUpFromLine,
  Send,
  Download,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

import { getCryptoPrices } from "../services/cryptoService";

function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format prices in Nigerian Naira
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(price);

  // Fetch cryptocurrency prices
  useEffect(() => {
    async function loadPrices() {
      try {
        setError("");

        const data = await getCryptoPrices();

        setCryptocurrencies(data);
      } catch (err) {
        setError("Unable to load market prices. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPrices();

    // Refresh prices every 60 seconds
    const interval = setInterval(loadPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">

      {/* Total Balance */}
      <section className="balance-card">
        <div className="balance-heading">
          <p>Total Balance (NGN)</p>

          <button
            className="visibility-button"
            onClick={() => setShowBalance(!showBalance)}
            aria-label="Toggle balance visibility"
          >
            {showBalance ? <Eye size={19} /> : <EyeOff size={19} />}
          </button>
        </div>

        <h1>{showBalance ? "₦0.00" : "••••••••"}</h1>

        <div className="balance-change">
          <TrendingUp size={16} />
          <span>Portfolio overview</span>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="action-item">
          <div className="action-icon">
            <ArrowDownToLine size={22} />
          </div>
          <span>Deposit</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <ArrowUpFromLine size={22} />
          </div>
          <span>Withdraw</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <Send size={22} />
          </div>
          <span>Send</span>
        </div>

        <div className="action-item">
          <div className="action-icon">
            <Download size={22} />
          </div>
          <span>Receive</span>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div>
          <p className="promo-label">PROFIT SCORE</p>
          <h2>
            Trade smarter.
            <br />
            Grow your portfolio.
          </h2>
          <p>Explore the cryptocurrency market.</p>
        </div>

        <TrendingUp size={48} />
      </section>

      {/* Cryptocurrency Prices */}
      <section className="popular-section">
        <div className="section-heading">
          <h2>Popular Cryptocurrencies</h2>
          <span>
            View all <ChevronRight size={16} />
          </span>
        </div>

        {loading && <p>Loading market prices...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="crypto-list">
            {cryptocurrencies.map((coin) => (
              <div className="crypto-item" key={coin.id}>
                <div className="coin-info">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-image"
                  />

                  <div>
                    <h3>{coin.name}</h3>
                    <p>{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>

                <div className="coin-price">
                  <h3>{formatPrice(coin.current_price)}</h3>

                  <p
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;