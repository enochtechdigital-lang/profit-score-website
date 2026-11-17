import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownUp,
  ChevronDown,
} from "lucide-react";

import { getCryptoPrices } from "../services/cryptoService";

function Trade() {
  const location = useLocation();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const [tradeType, setTradeType] = useState("buy");
  const [orderType, setOrderType] = useState("market");

  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const [loading, setLoading] = useState(true);

  // Load market prices
  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await getCryptoPrices();
        setCoins(data);
      } catch (error) {
        console.error("Market data error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPrices();

    const interval = setInterval(loadPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get selected coin from Market page
  useEffect(() => {
    const coinId = location.state?.coinId;

    if (coinId) {
      setSelectedCoin(coinId);
    }
  }, [location.state]);

  const activeCoin = coins.find(
    (coin) => coin.id === selectedCoin
  );

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  const marketPrice = activeCoin?.current_price ?? 0;

  const executionPrice =
    orderType === "limit" && limitPrice
      ? Number(limitPrice)
      : marketPrice;

  const estimatedValue =
    Number(amount || 0) * executionPrice;

  function handleTrade() {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (orderType === "limit" && Number(limitPrice) <= 0) {
      alert("Please enter a valid limit price.");
      return;
    }

    alert(
      `Demo ${tradeType.toUpperCase()} order prepared for ${activeCoin?.symbol.toUpperCase()}. No real transaction has occurred.`
    );

    setAmount("");
  }

  return (
    <div className="trade-page">

      {/* Header */}
      <div className="trade-heading">
        <div>
          <h1>Spot Trading</h1>
          <p>Buy and sell cryptocurrencies.</p>
        </div>

        <span className="demo-badge">DEMO</span>
      </div>

      {/* Coin Selection */}
      <section className="trade-pair-card">

        <div className="trade-pair-selector">
          <div className="selected-coin">
            {activeCoin?.image && (
              <img src={activeCoin.image} alt={activeCoin.name} />
            )}

            <div>
              <h2>
                {activeCoin?.symbol.toUpperCase() || "BTC"}
                /NGN
              </h2>

              <p>{activeCoin?.name || "Bitcoin"}</p>
            </div>
          </div>

          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.symbol.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="trade-market-price">
          <h1>
            {loading ? "Loading..." : formatPrice(marketPrice)}
          </h1>

          {activeCoin && (
            <span
              className={
                activeCoin.price_change_percentage_24h >= 0
                  ? "positive"
                  : "negative"
              }
            >
              {activeCoin.price_change_percentage_24h >= 0
                ? <TrendingUp size={15} />
                : <TrendingDown size={15} />
              }

              {activeCoin.price_change_percentage_24h?.toFixed(2)}%
              <small>24h</small>
            </span>
          )}
        </div>

        <div className="trade-market-stats">
          <div>
            <span>24h High</span>
            <p>{formatPrice(activeCoin?.high_24h)}</p>
          </div>

          <div>
            <span>24h Low</span>
            <p>{formatPrice(activeCoin?.low_24h)}</p>
          </div>

          <div>
            <span>24h Volume</span>
            <p>
              ₦{new Intl.NumberFormat("en-NG", {
                notation: "compact",
              }).format(activeCoin?.total_volume ?? 0)}
            </p>
          </div>
        </div>

      </section>

      {/* Chart Placeholder */}
      <section className="trade-chart">
        <div className="chart-heading">
          <h3>Price Chart</h3>
          <span>Market reference</span>
        </div>

        <div className="chart-placeholder">
          <TrendingUp size={40} />
          <p>Chart integration coming next.</p>
        </div>
      </section>

      {/* Trading Form */}
      <section className="trade-form-card">

        <h2>Place Order</h2>

        {/* Buy and Sell */}
        <div className="trade-type-switch">
          <button
            className={tradeType === "buy" ? "buy-active" : ""}
            onClick={() => setTradeType("buy")}
          >
            Buy
          </button>

          <button
            className={tradeType === "sell" ? "sell-active" : ""}
            onClick={() => setTradeType("sell")}
          >
            Sell
          </button>
        </div>

        {/* Order Type */}
        <div className="order-type-switch">
          <button
            className={orderType === "market" ? "selected" : ""}
            onClick={() => setOrderType("market")}
          >
            Market
          </button>

          <button
            className={orderType === "limit" ? "selected" : ""}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </button>
        </div>

        {/* Limit Price */}
        {orderType === "limit" && (
          <div className="trade-input-group">
            <label>Limit Price (NGN)</label>

            <input
              type="number"
              placeholder="Enter your limit price"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />
          </div>
        )}

        {/* Amount */}
        <div className="trade-input-group">
          <label>Amount ({activeCoin?.symbol.toUpperCase() || "BTC"})</label>

          <input
            type="number"
            min="0"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Estimated Value */}
        <div className="estimated-value">
          <span>Estimated Order Value</span>

          <strong>{formatPrice(estimatedValue)}</strong>
        </div>

        <button
          className={`place-order-button ${tradeType}`}
          onClick={handleTrade}
          disabled={loading || !activeCoin}
        >
          {tradeType === "buy" ? "Buy" : "Sell"}{" "}
          {activeCoin?.symbol.toUpperCase() || "BTC"}
        </button>

        <p className="demo-notice">
          Demo environment. Orders are not executed and no funds are moved.
        </p>

      </section>

      {/* Order History */}
      <section className="order-history">
        <div className="order-history-heading">
          <h2>Orders</h2>
          <ArrowDownUp size={18} />
        </div>

        <div className="order-tabs">
          <button className="active">Open Orders</button>
          <button>Order History</button>
          <button>Trade History</button>
        </div>

        <div className="empty-orders">
          <ArrowDownUp size={30} />
          <p>No orders yet</p>
        </div>
      </section>

    </div>
  );
}

export default Trade;