import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../lib/formatPrice'
import BrutalistButton from './BrutalistButton'

type OfferProductCardProps = {
  product: Product
}

export default function OfferProductCard({ product }: OfferProductCardProps) {
  const { label, name, subtitle, price, compareAtPrice, headerColor, imageSrc, isBundle, id } =
    product
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(id)
  }

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border-2 ${
        isBundle ? 'border-black bg-warm-cream shadow-[4px_4px_0_0_#000]' : 'border-transparent'
      }`}
    >
      <div className="relative">
        <div className={`h-28 sm:h-32 ${headerColor}`} aria-hidden="true" />
        <img
          src={imageSrc}
          alt=""
          className={`pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 object-contain ${
            isBundle
              ? 'h-44 w-auto max-w-[90%] sm:h-52'
              : 'h-40 w-auto max-w-[85%] sm:h-48'
          }`}
        />
      </div>

      <div
        className={`flex flex-1 flex-col bg-warm-cream px-6 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 ${
          isBundle ? 'sm:pt-32' : ''
        }`}
      >
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-black sm:text-sm">
          {label}
        </p>
        <h3 className="mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-[-0.02em] text-black sm:text-5xl">
          {name}
        </h3>
        <p className="mt-3 font-body text-base text-black sm:text-lg">{subtitle}</p>

        <div className="mt-auto flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-3">
            <p
              className={`font-heading text-3xl font-bold sm:text-4xl ${
                compareAtPrice ? 'text-red-600' : 'text-black'
              }`}
            >
              {formatPrice(price)} zł
            </p>
            {compareAtPrice ? (
              <p className="font-heading text-2xl font-bold text-black/40 line-through sm:text-3xl">
                {formatPrice(compareAtPrice)} zł
              </p>
            ) : null}
          </div>
          <BrutalistButton size="sm" fullWidth="mobile" onClick={handleAddToCart}>
            {isBundle ? 'Zamów pakiet' : 'Dodaj do koszyka'}
          </BrutalistButton>
        </div>
      </div>
    </article>
  )
}
