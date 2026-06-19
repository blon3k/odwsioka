import aboutUsImage from '../assets/aboutus.png'
import BrutalistButton from './BrutalistButton'

type AboutUsSectionProps = {
  founderName?: string
  portraitSrc?: string
  portraitAlt?: string
}

export default function AboutUsSection({
  founderName = 'Maciek',
  portraitSrc = aboutUsImage,
  portraitAlt = `Założyciel Mleko Naturalne — ${founderName}`,
}: AboutUsSectionProps = {}) {
  return (
    <section className="mx-auto mb-12 w-full max-w-6xl overflow-hidden rounded-3xl bg-cream px-6 py-12 sm:mb-16 sm:px-10 sm:py-14 lg:max-h-[640px] lg:px-12 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div className="flex flex-col gap-6 sm:gap-7">
          <h2 className="font-heading text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Od rolnika, nie z półki
          </h2>

          <div className="flex flex-col gap-3 font-body text-base leading-relaxed text-black sm:gap-4 sm:text-lg">
      
            <p>
              Prowadzimy gospodarstwo od pokoleń. Stawiamy na premium produkty: surowe mleko, ser i
              miód z najwyższą dbałością o jakość. Jesteśmy certyfikowani i wiemy dokładnie, co
              trafia na Twój stół.
            </p>
            <p>
              Szukaliśmy lepszego jedzenia bez kompromisów. Prawdziwy smak mleka, sera i miodu,
              prosto z naszego gospodarstwa.
            </p>
          </div>

          <BrutalistButton size="sm" className="self-start" to="/historia">
            Przeczytaj historię
          </BrutalistButton>
        </div>

        <div className="flex justify-center">
          <div className="relative h-[280px] w-full max-w-[280px] overflow-hidden sm:h-[340px] sm:max-w-[340px] lg:h-[420px] lg:max-w-[400px]">
            <img
              src={portraitSrc}
              alt={portraitAlt}
              className="about-portrait-outline absolute top-0 left-1/2 h-[155%] w-auto max-w-none -translate-x-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
