export function formatPrice(amount: number) {
  return Number.isInteger(amount)
    ? `${amount}`
    : amount.toFixed(2).replace('.', ',')
}
