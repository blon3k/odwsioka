import cors from 'cors'
import express from 'express'
import path from 'node:path'
import { config } from './config.js'
import { frontendDistDir } from './paths.js'
import { catalogRouter } from './routes/catalog.js'
import { checkoutRouter } from './routes/checkout.js'
import { productsRouter } from './routes/products.js'
import { webhooksRouter } from './routes/webhooks.js'
import { isTelegramConfigured } from './telegram/client.js'
import { startTelegramPolling, stopTelegramPolling } from './telegram/polling.js'

const app = express()

app.use(cors({ origin: config.CORS_ORIGIN }))

app.use(
  '/api/webhooks',
  express.raw({ type: 'application/json' }),
  webhooksRouter,
)

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/catalog', catalogRouter)
app.use('/api/products', productsRouter)
app.use('/api/checkout', checkoutRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendDistDir))

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next()
      return
    }

    res.sendFile(path.join(frontendDistDir, 'index.html'), (error) => {
      if (error) next(error)
    })
  })
}

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof Error && error.name === 'ZodError') {
      res.status(400).json({ error: 'Invalid request', details: error })
      return
    }

    console.error(error)

    const message = error instanceof Error ? error.message : 'Internal server error'
    const status = message.startsWith('No Shopify variant mapped') ? 400 : 500

    res.status(status).json({ error: message })
  },
)

app.listen(config.PORT, () => {
  console.log(`Backend listening on http://localhost:${config.PORT}`)

  if (isTelegramConfigured()) {
    startTelegramPolling()
    console.log('Telegram bot polling started')
  }
})

function shutdown() {
  stopTelegramPolling()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
