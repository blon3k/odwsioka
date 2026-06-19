type CheckoutItem = {
  productId: string
  quantity: number
}

type CheckoutResponse = {
  checkoutUrl: string
}

export async function createCheckout(items: CheckoutItem[]): Promise<string> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    }),
  })

  const data = (await response.json()) as CheckoutResponse & { error?: string }

  if (!response.ok) {
    throw new Error(data.error ?? 'Nie udało się przejść do kasy')
  }

  if (!data.checkoutUrl) {
    throw new Error('Brak adresu kasy Shopify')
  }

  return data.checkoutUrl
}
