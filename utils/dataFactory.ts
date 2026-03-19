export function generateTransferData() {
  return {
    fromAccount: Math.floor(Math.random() * 1000),
    toAccount: Math.floor(Math.random() * 1000),
    amount: Math.floor(Math.random() * 10000)
  };
}