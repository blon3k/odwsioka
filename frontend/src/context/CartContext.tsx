import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getProductById as getStaticProductById } from '../data/products'
import { normalizeMilkBundles } from '../lib/cartNormalize'
import { useProducts } from './ProductsContext'

export type CartItem = {
  productId: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  total: number
  compareTotal: number
  savings: number
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { getProductById } = useProducts()
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!getStaticProductById(productId)) return

    setItems((current) => {
      const existing = current.find((item) => item.productId === productId)
      const next = existing
        ? current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { productId, quantity }]

      return normalizeMilkBundles(next)
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => {
      const next =
        quantity <= 0
          ? current.filter((item) => item.productId !== productId)
          : current.map((item) => (item.productId === productId ? { ...item, quantity } : item))

      return normalizeMilkBundles(next)
    })
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId)
        return sum + (product?.price ?? 0) * item.quantity
      }, 0),
    [items, getProductById],
  )

  const compareTotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = getProductById(item.productId)
        if (!product) return sum
        const referencePrice = product.compareAtPrice ?? product.price
        return sum + referencePrice * item.quantity
      }, 0),
    [items, getProductById],
  )

  const savings = Math.round((compareTotal - total) * 100) / 100

  const value = useMemo(
    () => ({
      items,
      isOpen,
      itemCount,
      total,
      compareTotal,
      savings,
      addItem,
      removeItem,
      updateQuantity,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      itemCount,
      total,
      compareTotal,
      savings,
      addItem,
      removeItem,
      updateQuantity,
      openCart,
      closeCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
