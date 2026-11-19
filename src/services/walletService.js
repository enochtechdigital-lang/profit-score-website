const WALLET_KEY = "profitScoreWallet";

const DEFAULT_WALLET = {
  ngn: 5000000,
  assets: {
    binancecoin: 0,
    tether: 0,
    "bitcoin-cash": 0,
    solana: 0,
    bitcoin: 0,
    ripple: 0,
    ethereum: 0,
    litecoin: 0,
    "usd-coin": 0,
  },
};

export function getWallet() {
  try {
    const savedWallet = localStorage.getItem(WALLET_KEY);

    if (savedWallet) {
      const parsedWallet = JSON.parse(savedWallet);

      return {
        ...DEFAULT_WALLET,
        ...parsedWallet,
        assets: {
          ...DEFAULT_WALLET.assets,
          ...(parsedWallet.assets || {}),
        },
      };
    }

    localStorage.setItem(
      WALLET_KEY,
      JSON.stringify(DEFAULT_WALLET)
    );

    return DEFAULT_WALLET;
  } catch (error) {
    console.error("Unable to load wallet:", error);
    return DEFAULT_WALLET;
  }
}

export function saveWallet(wallet) {
  localStorage.setItem(
    WALLET_KEY,
    JSON.stringify(wallet)
  );

  window.dispatchEvent(new Event("walletUpdated"));
}

export function executeDemoTrade(order) {
  const wallet = getWallet();

  const total = Number(order.total);
  const quantity = Number(order.amount);

  if (
    !Number.isFinite(total) ||
    !Number.isFinite(quantity) ||
    total <= 0 ||
    quantity <= 0
  ) {
    throw new Error("Invalid order details.");
  }

  const symbol = order.symbol.toLowerCase();

  if (order.tradeType === "buy") {
    if (wallet.ngn < total) {
      throw new Error("Insufficient demo NGN balance.");
    }

    wallet.ngn -= total;

    wallet.assets[order.coinId] =
      (wallet.assets[order.coinId] || 0) + quantity;

  } else {
    const currentQuantity =
      wallet.assets[order.coinId] || 0;

    if (currentQuantity < quantity) {
      throw new Error(`Insufficient ${symbol.toUpperCase()} balance.`);
    }

    wallet.assets[order.coinId] =
      currentQuantity - quantity;

    wallet.ngn += total;
  }

  saveWallet(wallet);

  return wallet;
}