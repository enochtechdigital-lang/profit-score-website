import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const assets = [
  { id: "binancecoin", name: "BNB", description: "BNB" },
  { id: "tether", name: "Tether", description: "USDT" },
  { id: "bitcoin-cash", name: "Bitcoin Cash", description: "BCH" },
  { id: "solana", name: "Solana", description: "SOL" },
  { id: "bitcoin", name: "Bitcoin", description: "BTC" },
  { id: "ripple", name: "XRP", description: "XRP" },
  { id: "ethereum", name: "Ethereum", description: "ETH" },
  { id: "litecoin", name: "Litecoin", description: "LTC" },
  { id: "usd-coin", name: "USD Coin", description: "USDC" },
];

function Deposit() {
  const navigate = useNavigate();

  return (
    <div className="deposit-page">

      <div className="deposit-heading">
        <button onClick={() => navigate("/wallet")}>
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>Deposit</h1>
          <p>Select a cryptocurrency to deposit.</p>
        </div>
      </div>

      <div className="deposit-warning">
        <strong>Important</strong>
        <p>
          Always confirm the cryptocurrency and network before
          transferring funds.
        </p>
      </div>

      <section className="deposit-assets">
        <h2>Select Asset</h2>

        {assets.map((asset) => (
          <button
            className="deposit-asset"
            key={asset.id}
            onClick={() =>
              navigate("/deposit/details", {
                state: {
                  coinId: asset.id,
                  coinName: asset.name,
                  symbol: asset.description,
                },
              })
            }
          >
            <div className="deposit-asset-icon">
              {asset.description.slice(0, 1)}
            </div>

            <div className="deposit-asset-info">
              <h3>{asset.name}</h3>
              <p>{asset.description}</p>
            </div>

            <ChevronRight size={20} />
          </button>
        ))}
      </section>

    </div>
  );
}

export default Deposit;