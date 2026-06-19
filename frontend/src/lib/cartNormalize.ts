import { MILK_BUNDLE_PRODUCT_ID, MILK_BUNDLE_SIZE, MILK_PRODUCT_ID } from '../data/products'

type CartItem = {
  productId: string
  quantity: number
}

function getQuantity(items: CartItem[], productId: string) {
  return items
    .filter((item) => item.productId === productId)
    .reduce((sum, item) => sum + item.quantity, 0)
}

function setQuantity(items: CartItem[], productId: string, quantity: number) {
  const without = items.filter((item) => item.productId !== productId)
  if (quantity <= 0) return without
  return [...without, { productId, quantity }]
}

export function normalizeMilkBundles(items: CartItem[]): CartItem[] {
  const milkQty = getQuantity(items, MILK_PRODUCT_ID)
  const bundleQty = getQuantity(items, MILK_BUNDLE_PRODUCT_ID)
  const totalMilkUnits = milkQty + bundleQty * MILK_BUNDLE_SIZE

  if (totalMilkUnits < MILK_BUNDLE_SIZE) {
    return items
  }

  const nextBundleQty = Math.floor(totalMilkUnits / MILK_BUNDLE_SIZE)
  const remainingMilkQty = totalMilkUnits % MILK_BUNDLE_SIZE

  let normalized = items.filter(
    (item) => item.productId !== MILK_PRODUCT_ID && item.productId !== MILK_BUNDLE_PRODUCT_ID,
  )

  normalized = setQuantity(normalized, MILK_BUNDLE_PRODUCT_ID, nextBundleQty)
  normalized = setQuantity(normalized, MILK_PRODUCT_ID, remainingMilkQty)

  return normalized
}

export function milkUnitsUntilBundle(milkQuantity: number) {
  if (milkQuantity <= 0 || milkQuantity >= MILK_BUNDLE_SIZE) return 0
  return MILK_BUNDLE_SIZE - milkQuantity
}
