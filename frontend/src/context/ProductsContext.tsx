import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { products as staticProducts, type Product } from '../data/products'

type CatalogProduct = {
  id: string
  name: string
  price: number
  compareAtPrice?: number
}

type ProductsContextValue = {
  products: Product[]
  getProductById: (id: string) => Product | undefined
  isLoading: boolean
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

function mergeCatalogPrices(catalog: CatalogProduct[]): Product[] {
  const byId = new Map(catalog.map((item) => [item.id, item]))

  return staticProducts.map((product) => {
    const fromShopify = byId.get(product.id)
    if (!fromShopify) return product

    return {
      ...product,
      name: fromShopify.name,
      price: fromShopify.price,
      compareAtPrice: product.isBundle ? fromShopify.compareAtPrice : undefined,
    }
  })
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadPrices() {
      try {
        const response = await fetch('/api/catalog')
        if (!response.ok) return

        const data = (await response.json()) as { products: CatalogProduct[] }
        if (!cancelled && data.products?.length) {
          setProducts(mergeCatalogPrices(data.products))
        }
      } catch {
        // Keep fallback prices from static data.
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void loadPrices()

    return () => {
      cancelled = true
    }
  }, [])

  const getProductById = useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products],
  )

  const value = useMemo(
    () => ({
      products,
      getProductById,
      isLoading,
    }),
    [products, getProductById, isLoading],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider')
  }
  return context
}
