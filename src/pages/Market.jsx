import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { getCryptoPrices } from "../services/cryptoService";

function Market() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Format prices in Nigerian Naira
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  // Format large numbers
  const formatLargeNumber = (value) =>
    new Intl.NumberFormat("en-NG", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  // Load market data
  useEffect(() => {
    async function loadMarket() {
      try {
        setError("");

        const data = await getCryptoPrices();
        setCoins(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load market data.");
      } finally {
        setLoading(false);
      }
    }

    loadMarket();

    const interval = setInterval(loadMarket, 60000);

    return () => clearInterval(interval);
  }, []);

  // Search cryptocurrencies
  const filteredCoins = coins.filter((coin) => {
    const query = search.toLowerCase();

    return (
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  });

  // Open Trade page with selected coin
  const handleTrade = (coin) => {
    navigate("/trade", {
      state: {
        coinId: coin.id,
        coinName: coin.name,
        symbol: coin.symbol.toUpperCase(),
      },
    });
  };

  return (
    <div className="market-page">

      <div className="market-heading">
        <div>
          <h1>Crypto Market</h1>
          <p>Explore cryptocurrency prices and market movements.</p>
        </div>
      </div>

      {/* Search */}
      <div className="market-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Market statistics */}
      <div className="market-summary">
        <div className="summary-card">
          <span>Supported Assets</span>
          <h2>{coins.length}</h2>
        </div>

        <div className="summary-card">
          <span>Market Data</span>
          <h2>Live</h2>
        </div>
      </div>

      {/* Cryptocurrency list */}
      <section className="market-list-section">
        <h2>All Cryptocurrencies</h2>

        {loading && (
          <p className="market-message">Loading market data...</p>
        )}

        {error && (
          <p className="market-error">{error}</p>
        )}

        {!loading && !error && filteredCoins.length === 0 && (
          <p className="market-message">
            No cryptocurrency found.
          </p>
        )}

        {!loading && !error && (
          <div className="market-list">

            {filteredCoins.map((coin) => {
              const isPositive =
                (coin.price_change_percentage_24h ?? 0) >= 0;

              return (
                <div className="market-coin-card" key={coin.id}>

                  <div className="market-coin-top">
                    <div className="market-coin-info">
                      <img
                        src={coin.image}
                        alt={coin.name}
                      />

                      <div>
                        <h3>{coin.name}</h3>
                        <span>{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="market-price">
                      <h3>{formatPrice(coin.current_price)}</h3>

                      <span className={isPositive ? "positive" : "negative"}>
                        {isPositive
                          ? <TrendingUp size={14} />
                          : <TrendingDown size={14} />
                        }

                        {Math.abs(
                          coin.price_change_percentage_24h ?? 0
                        ).toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="market-coin-details">
                    <div>
                      <span>Market Cap</span>
                      <p>
                        ₦{formatLargeNumber(coin.market_cap)}
                      </p>
                    </div>

                    <div>
                      <span>24h Volume</span>
                      <p>
                        ₦{formatLargeNumber(coin.total_volume)}
                      </p>
                    </div>
                  </div>

                  <button
                    className="market-trade-button"
                    onClick={() => handleTrade(coin)}
                  >
                    Trade Now
                  </button>

                </div>
              );
            })}

          </div>
        )}
      </section>
    </div>
  );
}

export default Market;