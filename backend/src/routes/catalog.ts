import { Router } from 'express'
import { getStoreCatalog } from '../shopify/catalog.js'

export const catalogRouter = Router()

catalogRouter.get('/', async (_req, res, next) => {
  try {
    const products = await getStoreCatalog()
    res.json({ products })
  } catch (error) {
    next(error)
  }
})
