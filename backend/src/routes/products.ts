import { Router } from 'express'
import { z } from 'zod'
import { searchProducts } from '../shopify/products.js'

const querySchema = z.object({
  name: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
})

export const productsRouter = Router()

productsRouter.get('/', async (req, res, next) => {
  try {
    const filters = querySchema.parse(req.query)

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      res.status(400).json({ error: 'minPrice cannot be greater than maxPrice' })
      return
    }

    const products = await searchProducts(filters)
    res.json({ products, count: products.length })
  } catch (error) {
    next(error)
  }
})
