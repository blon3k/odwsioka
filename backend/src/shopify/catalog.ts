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

function variantIdToLocalIdMap(): Map<string, string> {
  const map = new Map<string, string>()
  for (const [localId, gid] of Object.entries(config.productVariantMap)) {
    const numericId = gid.replace('gid://shopify/ProductVariant/', '')
    map.set(numericId, localId)
  }
  return map
}

async function loadCatalog(): Promise<CatalogCache> {
  if (catalogCache) return catalogCache

  const response = await fetch(`https://${config.SHOPIFY_STORE_DOMAIN}/products.json`)
  if (!response.ok) {
    throw new Error(`Failed to load Shopify catalog (${response.status})`)
  }

  const data = (await response.json()) as { products: ShopifyProductJson[] }
  const variantIdByTitle = new Map<string, string>()
  const variantIdToLocalId = variantIdToLocalIdMap()
  const products: CatalogProduct[] = []

  for (const product of data.products) {
    const variant = product.variants[0]
    if (!variant) continue

    const variantId = String(variant.id)
    const titleKey = product.title.toLowerCase()
    variantIdByTitle.set(titleKey, variantId)

    const localId =
      variantIdToLocalId.get(variantId) ?? titleToLocalId.get(titleKey)
    if (!localId) continue

    const displayTitle = PRODUCT_TITLES[localId] ?? product.title
    variantIdByTitle.set(displayTitle.toLowerCase(), variantId)

    const compareAtPrice = variant.compare_at_price ? Number(variant.compare_at_price) : undefined

    products.push({
      id: localId,
      name: displayTitle,
      price: Number(variant.price),
      compareAtPrice: compareAtPrice && compareAtPrice > Number(variant.price) ? compareAtPrice : undefined,
      variantId,
    })
  }

  const expectedCount = Object.keys(config.productVariantMap).length
  if (products.length > 0 || expectedCount === 0) {
    catalogCache = { variantIdByTitle, products }
  }

  return { variantIdByTitle, products }
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
