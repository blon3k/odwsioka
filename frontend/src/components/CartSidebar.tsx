import { useEffect, useState } from 'react'
import { MIN_ORDER_ZL } from '../config/shop'
import { useProducts } from '../context/ProductsContext'
import { useCart } from '../context/CartContext'
import { MILK_PRODUCT_ID } from '../data/products'
import { createCheckout } from '../lib/checkout'
import { milkUnitsUntilBundle } from '../lib/cartNormalize'
import { formatPrice } from '../lib/formatPrice'
import BrutalistButton from './BrutalistButton'

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M4 7H20M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7M17 7V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CartSidebar() {
  const { getProductById } = useProducts()
  const { items, isOpen, total, compareTotal, savings, closeCart, updateQuantity, removeItem } =
    useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const remainingToMinOrder = Math.max(0, MIN_ORDER_ZL - total)
  const meetsMinOrder = total >= MIN_ORDER_ZL
  const hasSavings = savings > 0

  const handleCheckout = async () => {
    setCheckoutError(null)
    setIsCheckingOut(true)

    try {
      const checkoutUrl = await createCheckout(items)
      window.location.href = checkoutUrl
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Nie udało się przejść do kasy')
      setIsCheckingOut(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeCart])

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeCart}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sidebar-title"
        className={`fixed inset-y-0 right-0 z-[70] flex w-screen max-w-none flex-col border-l-2 border-black bg-warm-cream shadow-[-4px_0_0_0_#000] transition-transform duration-300 motion-reduce:transition-none sm:w-full sm:max-w-md ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b-2 border-black px-5 py-5 sm:px-6">
          <h2
            id="cart-sidebar-title"
            className="font-heading text-3xl font-bold uppercase tracking-tight text-black"
          >
            Koszyk
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-lg border-2 border-black p-2 text-black transition hover:bg-black hover:text-warm-cream"
            aria-label="Zamknij koszyk"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center">
              <p className="font-heading text-2xl font-bold uppercase text-black">Koszyk jest pusty</p>
              <p className="mt-2 font-body text-base text-black/70">
                Dodaj produkty z oferty, aby złożyć zamówienie.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const product = getProductById(item.productId)
                if (!product) return null

                const lineTotal = product.price * item.quantity
                const lineCompareTotal =
                  (product.compareAtPrice ?? product.price) * item.quantity
                const lineHasDiscount = lineCompareTotal > lineTotal
                const milkUntilBundle =
                  item.productId === MILK_PRODUCT_ID
                    ? milkUnitsUntilBundle(item.quantity)
                    : 0

                return (
                  <li key={item.productId} className="flex flex-col gap-2">
                    <div className="flex gap-4 rounded-2xl border-2 border-black bg-cream p-4">
                      <img
                        src={product.imageSrc}
                        alt=""
                        className="h-16 w-16 shrink-0 object-contain"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-black/70">
                              {product.label}
                            </p>
                            <p className="font-heading text-xl font-bold uppercase leading-tight text-black">
                              {product.name}
                            </p>
                            <div className="mt-1 flex flex-wrap items-baseline gap-2">
                              <p
                                className={`font-body text-sm ${
                                  lineHasDiscount ? 'font-semibold text-red-600' : 'text-black/70'
                                }`}
                              >
                                {formatPrice(product.price)} zł / szt.
                              </p>
                              {product.compareAtPrice ? (
                                <p className="font-body text-sm text-black/40 line-through">
                                  {formatPrice(product.compareAtPrice)} zł / szt.
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="shrink-0 text-black/50 transition hover:text-red-600"
                            aria-label={`Usuń ${product.name} z koszyka`}
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center overflow-hidden rounded-xl border-2 border-black bg-warm-cream">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center text-black transition hover:bg-black hover:text-warm-cream active:bg-black active:text-warm-cream"
                              aria-label={`Zmniejsz ilość ${product.name}`}
                            >
                              <MinusIcon />
                            </button>
                            <span className="min-w-8 text-center font-heading text-lg font-bold text-black">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center text-black transition hover:bg-black hover:text-warm-cream active:bg-black active:text-warm-cream"
                              aria-label={`Zwiększ ilość ${product.name}`}
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <div className="flex items-baseline gap-2">
                            {lineHasDiscount ? (
                              <p className="font-heading text-lg font-bold text-black/40 line-through">
                                {formatPrice(lineCompareTotal)} zł
                              </p>
                            ) : null}
                            <p
                              className={`font-heading text-xl font-bold ${
                                lineHasDiscount ? 'text-red-600' : 'text-black'
                              }`}
                            >
                              {formatPrice(lineTotal)} zł
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {milkUntilBundle > 0 ? (
                      <p className="rounded-lg bg-brand-yellow/20 px-3 py-2 font-body text-sm text-[#7a5a00]">
                        Dodaj jeszcze {milkUntilBundle}{' '}
                        {milkUntilBundle === 1 ? 'sztukę' : 'sztuki'}, aby odblokować zniżkę pakietową
                      </p>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <footer className="border-t-2 border-black px-5 py-5 sm:px-6">
          {hasSavings ? (
            <div className="mb-3 flex items-center justify-between font-body text-sm text-black/70">
              <p>Cena regularna</p>
              <p className="line-through">{formatPrice(compareTotal)} zł</p>
            </div>
          ) : null}

          {hasSavings ? (
            <div className="mb-4 flex items-center justify-between font-body text-sm font-semibold text-red-600">
              <p>Oszczędzasz</p>
              <p>-{formatPrice(savings)} zł</p>
            </div>
          ) : null}

          <div className="mb-4 flex items-center justify-between">
            <p className="font-body text-base text-black">Razem</p>
            <div className="flex items-baseline gap-2">
              {hasSavings ? (
                <p className="font-heading text-xl font-bold text-black/40 line-through">
                  {formatPrice(compareTotal)} zł
                </p>
              ) : null}
              <p
                className={`font-heading text-3xl font-bold ${
                  hasSavings ? 'text-red-600' : 'text-black'
                }`}
              >
                {formatPrice(total)} zł
              </p>
            </div>
          </div>

          {!meetsMinOrder && items.length > 0 ? (
            <div className="mb-4 rounded-xl border-2 border-black/20 bg-cream px-4 py-3">
              <p className="font-body text-sm leading-relaxed text-black/80">
                Minimalna kwota zamówienia to <strong>{MIN_ORDER_ZL} zł</strong>. Do minimalnej kwoty
                brakuje jeszcze <strong>{formatPrice(remainingToMinOrder)} zł</strong>.
              </p>
            </div>
          ) : null}

          {checkoutError ? (
            <div className="mb-4 rounded-xl border-2 border-red-600 bg-red-50 px-4 py-3">
              <p className="font-body text-sm leading-relaxed text-red-700">{checkoutError}</p>
            </div>
          ) : null}

          <BrutalistButton
            fullWidth
            disabled={items.length === 0 || !meetsMinOrder || isCheckingOut}
            onClick={handleCheckout}
          >
            {isCheckingOut ? 'Przekierowanie...' : 'Przejdź do kasy'}
          </BrutalistButton>
        </footer>
      </aside>
    </>
  )
}
