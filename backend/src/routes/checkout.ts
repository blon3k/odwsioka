import { Router } from 'express'
import { z } from 'zod'
import { createCheckout } from '../shopify/checkout.js'
import { notifyCheckoutCreated } from '../telegram/checkout-notify.js'
import { isTelegramConfigured } from '../telegram/client.js'

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
})

export const checkoutRouter = Router()

checkoutRouter.post('/', async (req, res, next) => {
  try {
    const { items } = checkoutSchema.parse(req.body)
    const checkout = await createCheckout(items)

    if (isTelegramConfigured()) {
      void notifyCheckoutCreated(items, checkout).catch((error) => {
        console.error('Checkout Telegram notification failed:', error)
      })
    }

    res.json(checkout)
  } catch (error) {
    next(error)
  }
})
