import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  ArrowDownUp,
} from "lucide-react";

import CandlestickChart from "../components/navigation/trading/CandlestickChart";
import { getCryptoPrices } from "../services/cryptoService";
import { executeDemoTrade } from "../services/walletService";

function Trade() {
  const location = useLocation();

  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const [tradeType, setTradeType] = useState("buy");
  const [orderType, setOrderType] = useState("market");

  const [amount, setAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");

  const [loading, setLoading] = useState(true);

  // Order review modal
  const [showReview, setShowReview] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [orders, setOrders] = useState(() => {
  try {
    const savedOrders = localStorage.getItem("profitScoreOrders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  } catch {
    return [];
  }
});
  const [activeTab, setActiveTab] = useState("open");


  useEffect(() => {
  try {
    localStorage.setItem(
      "profitScoreOrders",
      JSON.stringify(orders)
    );
  } catch (error) {
    console.error("Unable to save orders:", error);
  }
}, [orders]);

  // Load cryptocurrency prices
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

  // Selected cryptocurrency
  const activeCoin = coins.find(
    (coin) => coin.id === selectedCoin
  );

  // Format Nigerian Naira
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

  // Prepare order for review
  function handleTrade() {
    const numericAmount = Number(amount);
    const numericLimitPrice = Number(limitPrice);

    if (!activeCoin) {
      alert("Please select a cryptocurrency.");
      return;
    }

    if (
      !amount ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    if (
      orderType === "limit" &&
      (
        !limitPrice ||
        !Number.isFinite(numericLimitPrice) ||
        numericLimitPrice <= 0
      )
    ) {
      alert("Please enter a valid limit price.");
      return;
    }

    setPendingOrder({
  coinId: activeCoin.id,
  coinName: activeCoin.name,
  symbol: activeCoin.symbol.toUpperCase(),
  tradeType,
  orderType,
  amount: numericAmount,
  price: executionPrice,
  total: estimatedValue,
});

    setShowReview(true);
  }

  // Confirm demo order
 function confirmOrder() {
  try {
    const updatedWallet = executeDemoTrade(pendingOrder);

    const newOrder = {
      id: Date.now(),
      ...pendingOrder,
      status: "Completed",
      date: new Date().toLocaleString(),
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    setShowReview(false);
    setPendingOrder(null);
    setAmount("");
    setLimitPrice("");

    alert(
      `Demo ${pendingOrder.tradeType.toUpperCase()} successful!\n\nUpdated NGN balance: ${formatPrice(updatedWallet.ngn)}`
    );

  } catch (error) {
    alert(error.message);
  }
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
              <img
                src={activeCoin.image}
                alt={activeCoin.name}
              />
            )}

            <div>
              <h2>
                {activeCoin?.symbol.toUpperCase() || "BTC"}/NGN
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
              {activeCoin.price_change_percentage_24h >= 0 ? (
                <TrendingUp size={15} />
              ) : (
                <TrendingDown size={15} />
              )}

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
              ₦
              {new Intl.NumberFormat("en-NG", {
                notation: "compact",
              }).format(activeCoin?.total_volume ?? 0)}
            </p>
          </div>

        </div>

      </section>

      {/* Candlestick Chart */}
      <section className="trade-chart">
        <CandlestickChart coinId={selectedCoin} />
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
              min="0"
              step="any"
              placeholder="Enter your limit price"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
            />

          </div>
        )}

        {/* Amount */}
        <div className="trade-input-group">

          <label>
            Amount ({activeCoin?.symbol.toUpperCase() || "BTC"})
          </label>

          <input
            type="number"
            min="0"
            step="any"
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

        {/* Place Order */}
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

  {/* Order Tabs */}
  <div className="order-tabs">

    <button
      className={activeTab === "open" ? "active" : ""}
      onClick={() => setActiveTab("open")}
    >
      Open Orders
    </button>

    <button
      className={activeTab === "history" ? "active" : ""}
      onClick={() => setActiveTab("history")}
    >
      Order History
    </button>

  </div>

  {/* Orders Display */}
  <div className="orders-list">

    {orders.length === 0 ? (
      <div className="empty-orders">
        <ArrowDownUp size={30} />
        <p>No orders yet</p>
      </div>
    ) : activeTab === "open" ? (

      <div className="empty-orders">
        <ArrowDownUp size={30} />
        <p>No open orders</p>
      </div>

    ) : (

      orders.map((order) => (
        <div className="order-item" key={order.id}>

          <div className="order-item-top">

            <strong className={order.tradeType}>
              {order.tradeType.toUpperCase()} {order.symbol}
            </strong>

            <span className="order-status">
              {order.status}
            </span>

          </div>

          <div className="order-item-details">

            <div>
              <span>Amount</span>
              <strong>
                {order.amount} {order.symbol}
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>{formatPrice(order.price)}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>

          </div>

          <small className="order-date">
            {order.date}
          </small>

        </div>
      ))

    )}

  </div>

</section>

      {/* Order Review Modal */}
      {showReview && pendingOrder && (
        <div className="trade-modal-overlay">

          <div className="trade-review-modal">

            <h2>Review Your Order</h2>

            <p className="modal-subtitle">
              Please review your order details before confirming.
            </p>

            <div className="review-row">
              <span>Transaction</span>
              <strong>{pendingOrder.tradeType.toUpperCase()}</strong>
            </div>

            <div className="review-row">
              <span>Cryptocurrency</span>
              <strong>{pendingOrder.symbol}</strong>
            </div>

            <div className="review-row">
              <span>Order Type</span>
              <strong>{pendingOrder.orderType.toUpperCase()}</strong>
            </div>

            <div className="review-row">
              <span>Amount</span>
              <strong>
                {pendingOrder.amount} {pendingOrder.symbol}
              </strong>
            </div>

            <div className="review-row">
              <span>Price per coin</span>
              <strong>{formatPrice(pendingOrder.price)}</strong>
            </div>

            <div className="review-total">
              <span>Estimated Total</span>
              <strong>{formatPrice(pendingOrder.total)}</strong>
            </div>

            <div className="review-modal-actions">

              <button
                className="cancel-review-button"
                onClick={() => {
                  setShowReview(false);
                  setPendingOrder(null);
                }}
              >
                Cancel
              </button>

              <button
                className="confirm-review-button"
                onClick={confirmOrder}
              >
                Confirm Demo Order
              </button>

            </div>

            <p className="demo-notice">
              Simulation only. No real cryptocurrency will be purchased or sold.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default Trade;