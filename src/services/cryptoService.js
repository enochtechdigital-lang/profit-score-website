const API_URL = "https://api.coingecko.com/api/v3";

const COIN_IDS = [
  "binancecoin",
  "tether",
  "bitcoin-cash",
  "solana",
  "bitcoin",
  "ripple",
  "ethereum",
  "litecoin",
  "usd-coin",
];

export async function getCryptoPrices() {
  const response = await fetch(
    `${API_URL}/coins/markets?vs_currency=ngn&ids=${COIN_IDS.join(",")}&price_change_percentage=24h`,
    {
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to fetch cryptocurrency prices.");
  }

  return await response.json();
}