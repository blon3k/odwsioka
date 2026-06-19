import { config } from '../config.js'

export const PRODUCT_TITLES: Record<string, string> = {
  mleko: 'Surowe Mleko',
  ser: 'Ser Naturalny',
  miod: 'Miód Akacjowy',
  'mleko-3pak': 'Po prostu 3 mleka',
  'pakiet-startowy': 'Zestaw startowy',
}

export type CatalogProduct = {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  variantId: string
}

type ShopifyVariantJson = {
  id: number
  price: string
  compare_at_price: string | null
}

type ShopifyProductJson = {
  title: string
  variants: ShopifyVariantJson[]
}

type CatalogCache = {
  variantIdByTitle: Map<string, string>
  products: CatalogProduct[]
}

let catalogCache: CatalogCache | null = null

const titleToLocalId = new Map(
  Object.entries(PRODUCT_TITLES).map(([id, title]) => [title.toLowerCase(), id]),
)

async function loadCatalog(): Promise<CatalogCache> {
  if (catalogCache) return catalogCache

  const response = await fetch(`https://${config.SHOPIFY_STORE_DOMAIN}/products.json`)
  if (!response.ok) {
    throw new Error(`Failed to load Shopify catalog (${response.status})`)
  }

  const data = (await response.json()) as { products: ShopifyProductJson[] }
  const variantIdByTitle = new Map<string, string>()
  const products: CatalogProduct[] = []

  for (const product of data.products) {
    const variant = product.variants[0]
    if (!variant) continue

    const titleKey = product.title.toLowerCase()
    variantIdByTitle.set(titleKey, String(variant.id))

    const localId = titleToLocalId.get(titleKey)
    if (!localId) continue

    const compareAtPrice = variant.compare_at_price ? Number(variant.compare_at_price) : undefined

    products.push({
      id: localId,
      name: product.title,
      price: Number(variant.price),
      compareAtPrice: compareAtPrice && compareAtPrice > Number(variant.price) ? compareAtPrice : undefined,
      variantId: String(variant.id),
    })
  }

  catalogCache = { variantIdByTitle, products }
  return catalogCache
}

function variantIdFromMap(productId: string): string | null {
  const mapped = config.productVariantMap[productId]
  if (!mapped) return null
  return mapped.replace('gid://shopify/ProductVariant/', '')
}

export async function getStoreCatalog(): Promise<CatalogProduct[]> {
  const catalog = await loadCatalog()
  return catalog.products
}

export async function resolveVariantNumericId(productId: string): Promise<string> {
  const fromEnv = variantIdFromMap(productId)
  if (fromEnv) return fromEnv

  const title = PRODUCT_TITLES[productId]
  if (!title) {
    throw new Error(`Unknown productId "${productId}"`)
  }

  const catalog = await loadCatalog()
  const variantId = catalog.variantIdByTitle.get(title.toLowerCase())

  if (!variantId) {
    throw new Error(`No Shopify product found for "${title}"`)
  }

  return variantId
}
