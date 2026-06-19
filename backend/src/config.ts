import dotenv from 'dotenv'
import { z } from 'zod'
import { envFilePath } from './paths.js'

dotenv.config({ path: envFilePath })

function emptyToUndefined(value: unknown) {
  return value === '' || value === undefined ? undefined : value
}

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  SHOPIFY_STORE_DOMAIN: z.string().min(1),
  SHOPIFY_API_VERSION: z.string().default('2025-01'),
  SHOPIFY_CLIENT_ID: z.preprocess(emptyToUndefined, z.string().optional()),
  SHOPIFY_ADMIN_ACCESS_TOKEN: z.preprocess(emptyToUndefined, z.string().optional()),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1),
  SHOPIFY_WEBHOOK_SECRET: z.preprocess(emptyToUndefined, z.string().optional()),
  PRODUCT_VARIANT_MAP: z.string().default('{}'),
  TELEGRAM_BOT_API: z.preprocess(emptyToUndefined, z.string().optional()),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  process.exit(1)
}

const productVariantMapSchema = z.record(z.string(), z.string())

let productVariantMap: Record<string, string> = {}
try {
  productVariantMap = productVariantMapSchema.parse(JSON.parse(parsed.data.PRODUCT_VARIANT_MAP))
} catch {
  console.error('PRODUCT_VARIANT_MAP must be valid JSON, e.g. {"mleko":"gid://shopify/ProductVariant/123"}')
  process.exit(1)
}

export const config = {
  ...parsed.data,
  productVariantMap,
  adminApiUrl: `https://${parsed.data.SHOPIFY_STORE_DOMAIN}/admin/api/${parsed.data.SHOPIFY_API_VERSION}/graphql.json`,
  storefrontApiUrl: `https://${parsed.data.SHOPIFY_STORE_DOMAIN}/api/${parsed.data.SHOPIFY_API_VERSION}/graphql.json`,
}
