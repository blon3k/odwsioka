import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logotransparent.png'
import { useCart } from '../context/CartContext'

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        d="M2 3H2.72931C3.46257 3 4.08835 3.53012 4.2089 4.2534L4.5 6M4.5 6L5.5822 12.4932C5.82329 13.9398 7.07486 15 8.54138 15H17.0271C18.4632 15 19.6979 13.9823 19.972 12.5726L20.9027 7.7863C21.0827 6.86035 20.3735 6 19.4302 6H4.5ZM9 19C9 19.5523 8.55228 20 8 20C7.44772 20 7 19.5523 7 19C7 18.4477 7.44772 18 8 18C8.55228 18 9 18.4477 9 19ZM18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19C16 18.4477 16.4477 18 17 18C17.5523 18 18 18.4477 18 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const navLinks = [
  { label: 'Oferta', href: '/oferta' },
  { label: 'Historia', href: '/historia' },
  { label: 'Dlaczego My', href: '/#dlaczego-my' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openCart, itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="sticky top-2 z-50 w-full">
      <header
        className={`mx-auto w-full rounded-[8px] border-2 bg-warm-cream transition-[max-width,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled
            ? 'max-w-5xl overflow-visible border-black shadow-[4px_4px_0_0_#000,0_4px_12px_rgba(0,0,0,0.08)]'
            : 'max-w-full overflow-hidden border-transparent shadow-none'
        }`}
      >
      <nav
        className="flex items-center justify-between px-8 py-5 sm:grid sm:grid-cols-[1fr_auto_1fr] lg:px-12"
        aria-label="Główna nawigacja"
      >
        <Link to="/" className="ml-2 inline-flex shrink-0 items-center lg:ml-3">
          <img src={logo} alt="Mleko Naturalne" className="h-16 w-16 object-contain" />
        </Link>

        <ul className="hidden items-center justify-center gap-6 sm:flex lg:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="inline-flex items-center text-lg font-normal text-black transition hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center justify-end gap-4 sm:ml-0">
          <button
            type="button"
            className="text-black transition hover:opacity-70 sm:hidden"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon />
          </button>
          <button
            type="button"
            className="relative text-black transition hover:opacity-70"
            aria-label="Koszyk"
            onClick={openCart}
          >
            <CartIcon />
            {itemCount > 0 ? (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-black bg-brand-yellow px-1 font-heading text-xs font-bold text-black">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-black/5 px-8 py-4 sm:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="inline-flex items-center text-lg font-normal text-black transition hover:opacity-70"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      </header>
    </div>
  )
}
