import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useProducts } from '../context/ProductsContext'
import OfferProductCard from '../components/OfferProductCard'

import type { Product } from '../data/products'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function matchesSearch(product: Product, query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  return (
    product.name.toLowerCase().includes(normalized) ||
    product.subtitle.toLowerCase().includes(normalized) ||
    product.label.toLowerCase().includes(normalized)
  )
}

export default function OfferPage() {
  const { products } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => matchesSearch(product, searchQuery))
  }, [products, searchQuery])

  const regularProducts = filteredProducts.filter((p) => !p.isBundle)
  const bundleProducts = filteredProducts.filter((p) => p.isBundle)

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-white p-2">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-10 sm:mb-12">
          <h1 className="font-heading text-5xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black sm:text-6xl md:text-7xl">
            Oferta
          </h1>
        </header>

        <label className="relative mb-10 block sm:mb-12">
          <span className="sr-only">Szukaj produktów</span>
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-black/50">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Szukaj mleka, sera, miodu..."
            className="w-full rounded-2xl border-2 border-black bg-warm-cream py-4 pr-4 pl-12 font-body text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-offset-2"
          />
        </label>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-black/20 bg-warm-cream px-6 py-16 text-center">
            <p className="font-heading text-3xl font-bold uppercase text-black sm:text-4xl">
              Brak wyników
            </p>
            <p className="mt-3 font-body text-base text-black/70 sm:text-lg">
              Spróbuj innej frazy.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {regularProducts.length > 0 ? (
              <section aria-label="Produkty">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {regularProducts.map((product) => (
                    <OfferProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ) : null}

            {bundleProducts.length > 0 ? (
              <section aria-label="Pakiety">
                {regularProducts.length > 0 ? (
                  <h2 className="mb-6 font-heading text-3xl font-bold uppercase tracking-[-0.02em] text-black sm:text-4xl">
                    Pakiety
                  </h2>
                ) : null}
                <div className="grid gap-6 lg:grid-cols-2">
                  {bundleProducts.map((product) => (
                    <OfferProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
