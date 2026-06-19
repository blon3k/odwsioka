import { config } from '../config.js'
import { resolveVariantNumericId } from './catalog.js'
import { storefrontGraphql } from './client.js'

export type CheckoutLineItem = {
  productId: string
  quantity: number
}

export type CheckoutResult = {
  cartId: string
  checkoutUrl: string
}

type CartCreateResult = {
  cartCreate: {
    cart: {
      id: string
      checkoutUrl: string
    } | null
    userErrors: Array<{ field: string[] | null; message: string }>
  }
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

function buildCartPermalink(items: Array<{ variantId: string; quantity: number }>) {
  const path = items.map((item) => `${item.variantId}:${item.quantity}`).join(',')
  return `https://${config.SHOPIFY_STORE_DOMAIN}/cart/${path}`
}

async function createCheckoutViaStorefront(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<CheckoutResult | null> {
  try {
    const data = await storefrontGraphql<CartCreateResult>(CART_CREATE_MUTATION, {
      input: { lines },
    })

    const { cart, userErrors } = data.cartCreate

    if (userErrors.length > 0 || !cart?.checkoutUrl) {
      return null
    }

    return {
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
    }
  } catch {
    return null
  }
}

export async function createCheckout(items: CheckoutLineItem[]): Promise<CheckoutResult> {
  const resolved = await Promise.all(
    items.map(async (item) => ({
      variantId: await resolveVariantNumericId(item.productId),
      quantity: item.quantity,
    })),
  )

  const storefrontLines = resolved.map((item) => ({
    merchandiseId: `gid://shopify/ProductVariant/${item.variantId}`,
    quantity: item.quantity,
  }))

  const storefrontCheckout = await createCheckoutViaStorefront(storefrontLines)
  if (storefrontCheckout) {
    return storefrontCheckout
  }

  return {
    cartId: '',
    checkoutUrl: buildCartPermalink(resolved),
  }
}
