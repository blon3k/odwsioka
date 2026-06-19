import honeyImage from '../assets/honey.png'
import milkImage from '../assets/milk.png'
import cheeseImage from '../assets/ser.png'
import BrutalistButton from './BrutalistButton'

type ProductCard = {
  label: string
  name: string
  subtitle: string
  headerColor: string
  imageSrc?: string
}

const products: ProductCard[] = [
  {
    label: 'Baza',
    name: 'Mleko',
    subtitle: 'Białko, wapń i pełny smak prosto od krowy — butelka 1 l',
    headerColor: 'bg-[#00B2FF]',
    imageSrc: milkImage,
  },
  {
    label: 'Siła',
    name: 'Ser Naturalny',
    subtitle: 'Skoncentrowane białko i minerały z gospodarstwa — 200 g',
    headerColor: 'bg-[#FF339B]',
    imageSrc: cheeseImage,
  },
  {
    label: 'Energia',
    name: 'Miód akacjowy',
    subtitle: 'Naturalna energia i antyoksydanty z lokalnej pasieki — 250 g',
    headerColor: 'bg-[#834FFE]',
    imageSrc: honeyImage,
  },
]

function ProductCardItem({ label, name, subtitle, headerColor, imageSrc }: ProductCard) {
  return (
    <article className="overflow-hidden rounded-2xl">
      <div className="relative">
        <div className={`h-32 sm:h-40 ${headerColor}`} aria-hidden="true" />
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-52 w-auto max-w-[95%] -translate-x-1/2 translate-y-1/2 object-contain sm:h-60 md:h-72"
          />
        ) : null}
      </div>
      <div
        className={`bg-warm-cream px-8 text-center sm:px-10 ${
          imageSrc ? 'pb-12 pt-28 sm:pb-14 sm:pt-32 md:pt-36' : 'py-12 sm:py-14'
        }`}
      >
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-black sm:text-sm">
          {label}
        </p>
        <h3 className="mt-4 font-heading text-5xl font-bold uppercase leading-none tracking-[-0.02em] text-black sm:text-6xl">
          {name}
        </h3>
        <p className="mt-4 font-body text-lg text-black sm:text-xl">{subtitle}</p>
      </div>
    </article>
  )
}

export default function ProductShowcaseSection() {
  return (
    <section id="oferta" className="overflow-hidden rounded-[8px] bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[90rem] text-center">
        <h2 className="mx-auto max-w-full font-heading text-[clamp(1.25rem,5.5vw,8rem)] font-bold uppercase leading-[0.95] tracking-[-0.03em] text-black whitespace-nowrap">
          Mleko. Miód. Ser.
        </h2>

        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
          {products.map((product) => (
            <ProductCardItem key={product.name} {...product} />
          ))}
        </div>

        <BrutalistButton to="/oferta" className="mt-16 sm:mt-20">
          Zobacz całą ofertę
        </BrutalistButton>
      </div>
    </section>
  )
}
