import { Link } from 'react-router-dom'
import aboutUsImage from '../assets/aboutus.png'
import BrutalistButton from '../components/BrutalistButton'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const milestones = [
  {
    year: '1980',
    title: 'Pierwsze krowy na wsi',
    text: 'Dziadek postawił pierwsze obory i zaczął dostarczać mleko do sąsiednich domów. Od początku liczyło się tylko jedno — jakość, nie ilość.',
  },
  {
    year: '2005',
    title: 'Druga generacja',
    text: 'Rodzina przejęła gospodarstwo i rozszerzyła hodowlę. Serownia i pasieka dołączyły do mleczarni, żeby wszystko trzymać pod jednym dachem.',
  },
  {
    year: '2018',
    title: 'Certyfikacja i standardy',
    text: 'Wprowadziliśmy rygorystyczne procedury jakości i certyfikację. Każda partia mleka, sera i miodu przechodzi kontrolę zanim trafi do klienta.',
  },
  {
    year: 'Dziś',
    title: 'Prosto do Ciebie',
    text: 'Maciek i zespół dostarczają surowe mleko, ser i miód bez pośredników. Od rolnika, nie z półki — tak jak od zawsze powinno być.',
  },
] as const

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col gap-2 bg-white p-2">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-10 sm:mb-14">
          <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-black/50 sm:text-base">
            Mleko Naturalne
          </p>
          <h1 className="mt-3 font-heading text-5xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black sm:text-6xl md:text-7xl lg:text-8xl">
            Nasza
            <br />
            historia
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-black sm:text-lg">
            Gospodarstwo prowadzone od pokoleń. Szukaliśmy lepszego jedzenia bez kompromisów — i
            postanowiliśmy dzielić się tym, co sami jemy każdego dnia.
          </p>
        </header>

        <section className="mb-12 overflow-hidden rounded-3xl bg-cream sm:mb-16">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex justify-center px-6 pt-8 sm:px-10 sm:pt-10 lg:justify-end lg:px-0 lg:pt-0 lg:pr-12">
              <div className="relative h-[280px] w-full max-w-[280px] overflow-hidden sm:h-[340px] sm:max-w-[340px] lg:h-[420px] lg:max-w-[400px]">
                <img
                  src={aboutUsImage}
                  alt="Maciek — założyciel Mleko Naturalne"
                  className="about-portrait-outline absolute top-0 left-1/2 h-[155%] w-auto max-w-none -translate-x-1/2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 px-6 pb-8 sm:gap-6 sm:px-10 sm:pb-10 lg:py-12 lg:pr-12">
              <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-black sm:text-5xl">
                Od rolnika,
                <br />
                nie z półki
              </h2>
              <div className="flex flex-col gap-4 font-body text-base leading-relaxed text-black sm:text-lg">
                <p>
                  Prowadzimy gospodarstwo od pokoleń. Stawiamy na premium produkty: surowe mleko,
                  ser i miód z najwyższą dbałością o jakość. Jesteśmy certyfikowani i wiemy
                  dokładnie, co trafia na Twój stół.
                </p>
                <p>
                  Prawdziwy smak mleka, sera i miodu prosto z naszego gospodarstwa — bez
                  przemysłowych skrótów i bez udawania, że to to samo co produkt ze sklepu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="timeline-heading" className="mb-12 sm:mb-16">
          <h2
            id="timeline-heading"
            className="mb-8 font-heading text-3xl font-bold uppercase tracking-[-0.02em] text-black sm:mb-10 sm:text-4xl md:text-5xl"
          >
            Pokolenia na farmie
          </h2>

          <ol className="flex flex-col gap-6 sm:gap-8">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="grid gap-4 rounded-2xl border-2 border-black bg-warm-cream p-6 sm:grid-cols-[120px_1fr] sm:gap-8 sm:p-8"
              >
                <p className="font-heading text-4xl font-bold uppercase text-brand-yellow sm:text-5xl">
                  {milestone.year}
                </p>
                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-[-0.02em] text-black sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 font-body text-base leading-relaxed text-black/80 sm:text-lg">
                    {milestone.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="overflow-hidden rounded-3xl bg-warm-cream px-6 py-10 sm:px-10 sm:py-14">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:gap-6">
            <h2 className="font-heading text-4xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-black sm:text-5xl">
              Maciek
            </h2>
            <p className="font-body text-sm font-medium uppercase tracking-[0.15em] text-black/50">
              Założyciel
            </p>
            <p className="font-body text-base leading-relaxed text-black sm:text-lg">
              „Chciałem, żeby ludzie wiedzieli skąd bierze się ich jedzenie. Żeby mogli zaufać
              farmerowi, a nie etykiecie w sklepie. Dlatego wysyłamy wszystko prosto z gospodarstwa
              — tak, jak sami to jemy u siebie w domu.”
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <BrutalistButton size="sm" to="/oferta">
                Zobacz ofertę
              </BrutalistButton>
              <Link
                to="/"
                className="inline-flex items-center font-body text-base font-medium text-black underline decoration-black/30 underline-offset-4 transition hover:decoration-black"
              >
                Wróć na stronę główną
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
