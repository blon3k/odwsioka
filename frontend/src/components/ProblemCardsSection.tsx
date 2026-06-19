type ProblemCard = {
  title: string
  body: string
  rotation: string
}

const cards: ProblemCard[] = [
  {
    title: 'Tygodnie w chłodni',
    body: 'Sklepowe mleko to produkt przemysłowy. Leży w magazynie, jedzie przez pół kraju i traci to, co najważniejsze: świeżość i pełny smak.',
    rotation: '-rotate-2',
  },
  {
    title: 'Rozcieńczone i przetworzone',
    body: 'Taniej wychodzi utwardzić, dosolić i przedłużyć termin. Z pełnowartościowego nabiału zostaje biała woda z etykietą „naturalne".',
    rotation: 'rotate-1',
  },
  {
    title: 'Etykieta zamiast jakości',
    body: 'Na opakowaniu jest „eko" i „bio", a w środku produkt, który niewiele ma wspólnego z mlekiem od krowy. Smak i skład mówią prawdę, nie marketing.',
    rotation: 'rotate-2',
  },
]

function RedXBadge() {
  return (
    <div
      className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#e8453c] sm:-top-6 sm:h-12 sm:w-12"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
        <path
          d="M7 7l10 10M17 7L7 17"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function ProblemCardItem({ title, body, rotation }: ProblemCard) {
  return (
    <article
      className={`relative rounded-xl border border-neutral-200 bg-white px-8 pb-10 pt-12 text-center sm:px-10 sm:pb-12 sm:pt-14 ${rotation}`}
    >
      <RedXBadge />
      <h3 className="font-heading text-2xl font-bold leading-tight text-black sm:text-3xl">{title}</h3>
      <p className="mt-4 font-body text-base leading-relaxed text-black sm:text-lg">{body}</p>
    </article>
  )
}

export default function ProblemCardsSection() {
  return (
    <section className="overflow-hidden rounded-[8px] bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
      <h2 className="mx-auto max-w-5xl text-center font-heading text-4xl font-bold leading-tight tracking-[-0.02em] text-black sm:text-5xl lg:text-6xl">
        Sklepowe mleko to produkt przemysłowy. Nasze to pełnowartościowy nabiał.
      </h2>

      <div className="mx-auto mt-16 grid max-w-[90rem] gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
        {cards.map((card) => (
          <ProblemCardItem key={card.title} {...card} />
        ))}
      </div>
    </section>
  )
}
