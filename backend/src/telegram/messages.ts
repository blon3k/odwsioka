import { PRODUCT_TITLES } from '../shopify/catalog.js'
import {
  escapeHtml,
  formatDate,
  formatFinancialStatus,
  formatMoney,
} from './format.js'

export type CheckoutLine = {
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export type ShopifyOrderLine = {
  title: string
  quantity: number
  price: string
}

type ProductRow = {
  name: string
  quantity: number
  unitPrice?: number
  lineTotal: number
}

export type FormattedTelegramMessage = {
  rich: string
  plain: string
}

function formatProductTable(rows: ProductRow[], currency = 'PLN', withUnitPrice = true): string {
  const header = withUnitPrice
    ? '<tr><th>Produkt</th><th align="center">Ilość</th><th align="right">Cena</th><th align="right">Suma</th></tr>'
    : '<tr><th>Produkt</th><th align="center">Ilość</th><th align="right">Suma</th></tr>'

  const body = rows
    .map((row) => {
      const unitCell =
        withUnitPrice && row.unitPrice !== undefined
          ? `<td align="right">${formatMoney(row.unitPrice, currency)}</td>`
          : ''
      return (
        `<tr>` +
        `<td>${escapeHtml(row.name)}</td>` +
        `<td align="center">${row.quantity}</td>` +
        unitCell +
        `<td align="right">${formatMoney(row.lineTotal, currency)}</td>` +
        `</tr>`
      )
    })
    .join('')

  return `<table>${header}${body}</table>`
}

function formatProductLines(rows: ProductRow[], currency = 'PLN', withUnitPrice = true): string {
  return rows
    .map((row) => {
      const unit =
        withUnitPrice && row.unitPrice !== undefined
          ? ` (${formatMoney(row.unitPrice, currency)}/szt.)`
          : ''
      return `${escapeHtml(row.name)} × ${row.quantity} — ${formatMoney(row.lineTotal, currency)}${unit}`
    })
    .join('\n')
}

function paragraph(lines: string[]): string {
  return `<p>${lines.join('<br/>')}</p>`
}

export function formatCheckoutMessage(params: {
  lines: CheckoutLine[]
  total: number
  checkoutUrl: string
  cartId?: string
}): FormattedTelegramMessage {
  const { lines, total, checkoutUrl, cartId } = params

  const rows: ProductRow[] = lines.map((line) => ({
    name: line.name,
    quantity: line.quantity,
    unitPrice: line.unitPrice,
    lineTotal: line.lineTotal,
  }))

  const rich = [
    paragraph(['<b>Nowa kasa</b>']),
    paragraph([escapeHtml(formatDate(new Date())), `Suma: ${formatMoney(total)}`]),
    formatProductTable(rows),
    cartId ? paragraph([`Koszyk: <code>${escapeHtml(cartId)}</code>`]) : '',
    paragraph([`<a href="${escapeHtml(checkoutUrl)}">Link do kasy</a>`]),
  ]
    .filter(Boolean)
    .join('\n\n')

  const plain = [
    '<b>Nowa kasa</b>',
    '',
    formatDate(new Date()),
    `Suma: ${formatMoney(total)}`,
    '',
    formatProductLines(rows),
    cartId ? `\nKoszyk: <code>${escapeHtml(cartId)}</code>` : '',
    `\n<a href="${escapeHtml(checkoutUrl)}">Link do kasy</a>`,
  ]
    .filter(Boolean)
    .join('\n')

  return { rich, plain }
}

export function formatPurchaseMessage(params: {
  orderName: string
  createdAt: string
  totalPrice: string
  currency: string
  financialStatus?: string
  customerName?: string
  customerEmail?: string
  lineItems: ShopifyOrderLine[]
  shippingCity?: string
}): FormattedTelegramMessage {
  const {
    orderName,
    createdAt,
    totalPrice,
    currency,
    financialStatus,
    customerName,
    customerEmail,
    lineItems,
    shippingCity,
  } = params

  const rows: ProductRow[] = lineItems.map((item) => ({
    name: item.title,
    quantity: item.quantity,
    lineTotal: Number(item.price) * item.quantity,
  }))

  const customerParts = [customerName, customerEmail].filter(Boolean)
  const customerLine = customerParts.length > 0 ? customerParts.join(' · ') : 'Brak danych klienta'

  const metaLines = [
    escapeHtml(formatDate(createdAt)),
    `Zamówienie: ${escapeHtml(orderName)}`,
    `Suma: ${formatMoney(Number(totalPrice), currency)}`,
    financialStatus ? `Status: ${escapeHtml(formatFinancialStatus(financialStatus))}` : '',
  ].filter(Boolean)

  const footerLines = [
    `Klient: ${escapeHtml(customerLine)}`,
    shippingCity ? `Dostawa: ${escapeHtml(shippingCity)}` : '',
  ].filter(Boolean)

  const rich = [
    paragraph(['<b>Nowe zamówienie</b>']),
    paragraph(metaLines),
    rows.length > 0 ? formatProductTable(rows, currency, false) : paragraph(['Brak pozycji']),
    paragraph(footerLines),
  ].join('\n\n')

  const plain = [
    '<b>Nowe zamówienie</b>',
    '',
    ...metaLines,
    '',
    formatProductLines(rows, currency, false) || 'Brak pozycji',
    '',
    ...footerLines,
  ].join('\n')

  return { rich, plain }
}

export function formatStartMessage(added: boolean): string {
  if (added) {
    return [
      '<b>Subskrypcja aktywna</b>',
      '',
      'Będziesz otrzymywać powiadomienia o kasach i zakupach.',
      '',
      'Wyślij /stop, aby się wypisać.',
    ].join('\n')
  }

  return 'Już jesteś zapisany na powiadomienia.'
}

export function formatStopMessage(removed: boolean): string {
  if (removed) {
    return ['<b>Wypisano z powiadomień</b>', '', 'Wyślij /start, aby wrócić.'].join('\n')
  }

  return 'Nie byłeś zapisany na powiadomienia.'
}

export function formatHelpMessage(): string {
  return [
    '<b>Powiadomienia</b>',
    '',
    '/start — zapisz się na powiadomienia',
    '/stop — wypisz się',
  ].join('\n')
}

export function productNameForId(productId: string): string {
  return PRODUCT_TITLES[productId] ?? productId
}
