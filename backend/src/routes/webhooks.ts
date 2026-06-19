import { createHmac, timingSafeEqual } from 'node:crypto'
import { Router, type Request, type Response } from 'express'
import { config } from '../config.js'
import { formatPurchaseMessage } from '../telegram/messages.js'
import { notifySubscribers } from '../telegram/notify.js'

type ShopifyOrderWebhook = {
  name: string
  created_at: string
  total_price: string
  currency: string
  financial_status?: string
  line_items?: Array<{
    title: string
    quantity: number
    price: string
  }>
  customer?: {
    first_name?: string
    last_name?: string
    email?: string
  }
  shipping_address?: {
    city?: string
  }
}

function verifyShopifyWebhook(req: Request): boolean {
  const secret = config.SHOPIFY_WEBHOOK_SECRET
  if (!secret) return true

  const hmacHeader = req.get('x-shopify-hmac-sha256')
  if (!hmacHeader || !Buffer.isBuffer(req.body)) return false

  const digest = createHmac('sha256', secret).update(req.body).digest('base64')
  const expected = Buffer.from(digest)
  const received = Buffer.from(hmacHeader)

  if (expected.length !== received.length) return false
  return timingSafeEqual(expected, received)
}

export const webhooksRouter = Router()

webhooksRouter.post('/shopify/orders', async (req: Request, res: Response) => {
  if (!verifyShopifyWebhook(req)) {
    res.status(401).json({ error: 'Invalid webhook signature' })
    return
  }

  res.status(200).send('OK')

  try {
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : ''
    const order = JSON.parse(rawBody) as ShopifyOrderWebhook

    const customerName = [order.customer?.first_name, order.customer?.last_name]
      .filter(Boolean)
      .join(' ')

    const message = formatPurchaseMessage({
      orderName: order.name,
      createdAt: order.created_at,
      totalPrice: order.total_price,
      currency: order.currency || 'PLN',
      financialStatus: order.financial_status,
      customerName: customerName || undefined,
      customerEmail: order.customer?.email,
      lineItems: order.line_items ?? [],
      shippingCity: order.shipping_address?.city,
    })

    await notifySubscribers(message)
  } catch (error) {
    console.error('Shopify order webhook handling failed:', error)
  }
})
