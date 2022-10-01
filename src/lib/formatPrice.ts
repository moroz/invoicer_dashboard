export default function formatPrice(amount: string | number, currency: string) {
  const asNumber = Number(amount).toFixed(2);
  return `${asNumber} ${currency}`;
}
