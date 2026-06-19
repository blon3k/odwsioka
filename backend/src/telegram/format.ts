export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function formatDate(date: Date | string): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Warsaw',
  }).format(value)
}

export function formatMoney(amount: number, currency = 'PLN'): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

const FINANCIAL_STATUS_LABELS: Record<string, string> = {
  paid: 'Opłacone',
  pending: 'Oczekujące',
  authorized: 'Autoryzowane',
  partially_paid: 'Częściowo opłacone',
  refunded: 'Zwrócone',
  voided: 'Anulowane',
  partially_refunded: 'Częściowo zwrócone',
}

export function formatFinancialStatus(status: string): string {
  return FINANCIAL_STATUS_LABELS[status] ?? status
}
