const DEPOSIT_KEY = "profitScoreDeposits";

// Get all saved deposit records
export function getDeposits() {
  try {
    const savedDeposits = localStorage.getItem(DEPOSIT_KEY);

    return savedDeposits ? JSON.parse(savedDeposits) : [];
  } catch (error) {
    console.error("Unable to retrieve deposits:", error);
    return [];
  }
}

// Save a new deposit submission
export function submitDeposit(depositData) {
  const deposits = getDeposits();

  const newDeposit = {
    id: `DEP-${Date.now()}`,
    coinId: depositData.coinId,
    coinName: depositData.coinName,
    symbol: depositData.symbol,
    networkId: depositData.networkId,
    networkName: depositData.networkName,
    amount: Number(depositData.amount),
    transactionHash: depositData.transactionHash.trim(),
    receiptName: depositData.receiptName || null,
    status: "Pending Verification",
    date: new Date().toISOString(),
  };

  const updatedDeposits = [newDeposit, ...deposits];

  localStorage.setItem(
    DEPOSIT_KEY,
    JSON.stringify(updatedDeposits)
  );

  return newDeposit;
}