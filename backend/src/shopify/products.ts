import { adminGraphql } from './client.js'

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  status: string
  variants: Array<{
    id: string
    title: string
    price: number
    compareAtPrice: number | null
    sku: string | null
    availableForSale: boolean
  }>
}

type ProductsQueryResult = {
  products: {
    edges: Array<{
      node: {
        id: string
        title: string
        handle: string
        status: string
        variants: {
          edges: Array<{
            node: {
              id: string
              title: string
              price: string
              compareAtPrice: string | null
              sku: string | null
              availableForSale: boolean
            }
          }>
        }
      }
    }>
  }
}

const PRODUCTS_QUERY = `
  query Products($query: String, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          status
          variants(first: 20) {
            edges {
              node {
                id
                title
                price
                compareAtPrice
                sku
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`

function mapProduct(node: ProductsQueryResult['products']['edges'][number]['node']): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    status: node.status,
    variants: node.variants.edges.map(({ node: variant }) => ({
      id: variant.id,
      title: variant.title,
      price: Number(variant.price),
      compareAtPrice: variant.compareAtPrice ? Number(variant.compareAtPrice) : null,
      sku: variant.sku,
      availableForSale: variant.availableForSale,
    })),
  }
}

function buildShopifyQuery(filters: { name?: string; minPrice?: number; maxPrice?: number }) {
  const parts: string[] = ['status:active']

  if (filters.name?.trim()) {
    const escaped = filters.name.trim().replace(/"/g, '\\"')
    parts.push(`title:*${escaped}*`)
  }

  if (filters.minPrice !== undefined) {
    parts.push(`variants.price:>=${filters.minPrice}`)
  }

  if (filters.maxPrice !== undefined) {
    parts.push(`variants.price:<=${filters.maxPrice}`)
  }

  return parts.join(' ')
}

export async function searchProducts(filters: {
  name?: string
  minPrice?: number
  maxPrice?: number
  limit?: number
}): Promise<ShopifyProduct[]> {
  const data = await adminGraphql<ProductsQueryResult>(PRODUCTS_QUERY, {
    query: buildShopifyQuery(filters),
    first: Math.min(filters.limit ?? 50, 50),
  })

  let products = data.products.edges.map(({ node }) => mapProduct(node))

  // Shopify's price filters are approximate; apply exact bounds on variant prices.
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    products = products
      .map((product) => ({
        ...product,
        variants: product.variants.filter((variant) => {
          if (filters.minPrice !== undefined && variant.price < filters.minPrice) return false
          if (filters.maxPrice !== undefined && variant.price > filters.maxPrice) return false
          return true
        }),
      }))
      .filter((product) => product.variants.length > 0)
  }

  if (filters.name?.trim()) {
    const needle = filters.name.trim().toLowerCase()
    products = products.filter((product) => product.title.toLowerCase().includes(needle))
  }

  return products
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await adminGraphql<ProductsQueryResult>(PRODUCTS_QUERY, {
    query: `handle:${handle}`,
    first: 1,
  })

  const node = data.products.edges[0]?.node
  return node ? mapProduct(node) : null
}
