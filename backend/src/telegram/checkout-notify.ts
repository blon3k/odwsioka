import { getStoreCatalog, PRODUCT_TITLES } from '../shopify/catalog.js'
import type { CheckoutLineItem, CheckoutResult } from '../shopify/checkout.js'
import { formatCheckoutMessage, productNameForId } from './messages.js'
import { notifySubscribers } from './notify.js'

export async function notifyCheckoutCreated(
  items: CheckoutLineItem[],
  checkout: CheckoutResult,
): Promise<void> {
  const catalog = await getStoreCatalog()
  const catalogById = new Map(catalog.map((product) => [product.id, product]))

  let total = 0
  const lines = items.map((item) => {
    const product = catalogById.get(item.productId)
    const name = product?.name ?? productNameForId(item.productId)
    const unitPrice = product?.price ?? 0
    const lineTotal = unitPrice * item.quantity
    total += lineTotal

    return {
      name,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
    }
  })

  const unknownIds = items.filter((item) => !catalogById.has(item.productId) && !PRODUCT_TITLES[item.productId])
  if (unknownIds.length > 0) {
    console.warn('Checkout notification: unknown product IDs:', unknownIds.map((item) => item.productId))
  }

  const message = formatCheckoutMessage({
    lines,
    total,
    checkoutUrl: checkout.checkoutUrl,
    cartId: checkout.cartId || undefined,
  })

  await notifySubscribers(message)
}
