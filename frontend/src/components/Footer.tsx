import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Polityka prywatności', to: '/polityka-prywatnosci' },
  { label: 'Regulamin', to: '/regulamin' },
  { label: 'Polityka i zwroty', to: '/polityka-zwrotow' },
] as const

export default function Footer() {
  return (
    <footer className="overflow-hidden rounded-[8px] bg-warm-cream px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-heading text-6xl font-bold leading-[0.92] tracking-[-0.03em] sm:text-7xl md:text-8xl">
          <span className="text-black">Nowe dostawy.</span>
          <br />
          <span className="text-brand-yellow">Zniżki bez ściemy.</span>
        </h2>

        <form
          className="mt-8 flex w-full max-w-lg flex-col gap-2 sm:mt-10 sm:flex-row"
          aria-disabled="true"
        >
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Adres e-mail
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            disabled
            placeholder="twoj@email.pl"
            className="min-w-0 flex-1 cursor-not-allowed rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-3.5 font-body text-base text-neutral-500 placeholder:text-neutral-400 sm:px-5 sm:py-4"
          />
          <button
            type="button"
            disabled
            className="shrink-0 cursor-not-allowed rounded-xl bg-neutral-200 px-8 py-3.5 font-heading text-base font-bold uppercase tracking-wide text-neutral-500 sm:px-10 sm:py-4 sm:text-lg"
          >
            chwilowo niedostępne
          </button>
        </form>

        <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-neutral-700 sm:mt-10 sm:text-lg">
          Zapisz się i dowiaduj się o nowych dostawach surowego mleka, sera i miodu.
          Bez spamu. Tylko to, co warto wiedzieć o produktach z gospodarstwa.
        </p>
      </div>

      <hr className="mx-auto mt-14 w-full max-w-5xl border-0 border-t border-neutral-300 sm:mt-16" />

      <nav
        className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-12 sm:gap-x-10"
        aria-label="Stopka"
      >
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="font-body text-sm text-neutral-700 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-black sm:text-base"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
