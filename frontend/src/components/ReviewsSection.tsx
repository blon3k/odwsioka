import pfp1 from '../assets/pfp/219b6a64c6c952e91137605ff269ea7f.jpg'
import pfp2 from '../assets/pfp/5996edd07b2cc8909cfb26968dcb2c92.jpg'
import pfp3 from '../assets/pfp/a62caece3dabc3660749cc39218266fd.jpg'
import pfp4 from '../assets/pfp/c580123ec73615cfa9ba25b287dae36d.jpg'
import pfp5 from '../assets/pfp/ca2eabbb4a9b5d974c22f249d8fa0771.jpg'
import pfp6 from '../assets/pfp/f5be090fa5083fff469465894781bfe2.jpg'

const pfps = [pfp1, pfp2, pfp3, pfp4, pfp5, pfp6]

type Review = {
  id: string
  rating: number
  headline: string
  body: string
  name: string
  avatarSrc: string
}

const reviews: Review[] = [
  {
    id: '1',
    rating: 5,
    headline: 'Inne niż ze sklepu',
    body: 'To mleko smakuje tak, jak powinno. Prosto z gospodarstwa, gęste i pełne smaku. Widać różnicę już po pierwszym łyku.',
    name: 'Robert Watkins',
    avatarSrc: pfps[0],
  },
  {
    id: '2',
    rating: 5,
    headline: 'Prawdziwe mleko',
    body: 'Nareszcie produkt, który nie udaje naturalności. Świeże, kremowe i od ludzi, którym można zaufać. Cała rodzina przeszła na lokalne.',
    name: 'Sarah Chen',
    avatarSrc: pfps[1],
  },
  {
    id: '3',
    rating: 5,
    headline: 'Ser z gospodarstwa',
    body: 'Smak, którego szukałam latami. Nie z półki supermarketu. Prawdziwy ser od sąsiadów z własnej pasieki. Dokładnie tak, jak pamiętam.',
    name: 'Maria Kowalska',
    avatarSrc: pfps[2],
  },
  {
    id: '4',
    rating: 5,
    headline: 'Miód, nie syrop',
    body: 'Jeden łyżeczka i wiesz, że to nie jest syrop z etykietą „naturalny". Sezonowy, lokalny i uczciwy. Dokładnie to, czego brakowało.',
    name: 'James Okafor',
    avatarSrc: pfps[3],
  },
  {
    id: '5',
    rating: 1,
    headline: 'Za dobre na prawdę',
    body: 'Nie lubię, gdy jedzenie smakuje zbyt uczciwie. Wróciłem do sklepowego, ale żona i tak kupuje od Was. Jedna gwiazdka, bo musiałem.',
    name: 'Jan Nowak',
    avatarSrc: pfps[4],
  },
  {
    id: '6',
    rating: 5,
    headline: 'Bez waty',
    body: 'Przez lata kupowałam „eko" z marketu. Tu po raz pierwszy czuję różnicę. Mleko gęste, białe, bez waty. Dzieci piją same, bez cukru.',
    name: 'Anna Wiśniewska',
    avatarSrc: pfps[5],
  },
  {
    id: '7',
    rating: 5,
    headline: 'Jogurt z prawdziwego mleka',
    body: 'Gęsty, kwaśny w sam raz, zero sztucznych aromatów. Smakuje jak ten z wakacji u babci na wsi. Widać, że to pełnowartościowy nabiał.',
    name: 'Tomasz Zieliński',
    avatarSrc: pfps[0],
  },
  {
    id: '8',
    rating: 5,
    headline: 'Lepszy sen wieczorem',
    body: 'Wieczorna kawa z Waszym mlekiem to mój rytuał. Smak pełny, wieczór spokojny, sen lepszej jakości. Prosty produkt, duża różnica.',
    name: 'Elena Vasquez',
    avatarSrc: pfps[1],
  },
  {
    id: '9',
    rating: 5,
    headline: 'Masło z prawdziwego mleka',
    body: 'Żółte, aromatyczne, rozsmarowuje się samo. Nie to samo co kostka z lodówki, która smakuje jak plastik. Zamawiam co tydzień.',
    name: 'Piotr Lewandowski',
    avatarSrc: pfps[2],
  },
  {
    id: '10',
    rating: 5,
    headline: 'Dzieci w końcu jedzą ser',
    body: 'Mój syn nienawidził sera z supermarketu. Ten od Was zjadł pół talerza na kolację i pytał, czy można jeszcze. Dla mnie to najlepsza recenzja.',
    name: 'Katarzyna Dąbrowska',
    avatarSrc: pfps[3],
  },
  {
    id: '11',
    rating: 4,
    headline: 'Prawie idealne',
    body: 'Jedyne minus: dostawa w czwartek, a zjadam wszystko do środy. Smak, jakość, opakowanie bez zastrzeżeń. Czwarta gwiazdka za moją brak samokontroli.',
    name: 'Michał Wójcik',
    avatarSrc: pfps[4],
  },
  {
    id: '12',
    rating: 5,
    headline: 'Znam farmera z imienia',
    body: 'Wiem skąd mleko, wiem kiedy było dojone. To nie marketing. To po prostu uczciwe jedzenie z gospodarstwa. Tak powinno być zawsze.',
    name: 'Joanna Szymańska',
    avatarSrc: pfps[5],
  },
  {
    id: '13',
    rating: 5,
    headline: 'Śmietana do zupy',
    body: 'Gęsta, kremowa, nie rozlewa się w rosole. Używam też do ciasta. Wychodzi miękkie i wilgotne. Nie wracam do tej z kartonu.',
    name: 'Agnieszka Kamińska',
    avatarSrc: pfps[0],
  },
  {
    id: '14',
    rating: 5,
    headline: 'Miód lipowy, hit sezonu',
    body: 'Intensywny, lekko kwaskowy, krystalizuje się naturalnie. Z chlebem na zakwasie i masłem. Lepszego śniadania nie potrzebuję.',
    name: 'Marcin Jankowski',
    avatarSrc: pfps[1],
  },
  {
    id: '15',
    rating: 5,
    headline: 'Zaufanie od pierwszego łyku',
    body: 'Po skandalach z etykietami przestałam wierzyć w „naturalne" z półki. Tu czuję, że ktoś nie kłamie. Smak nie potrzebuje reklamy.',
    name: 'Helena Nowicka',
    avatarSrc: pfps[2],
  },
  {
    id: '16',
    rating: 2,
    headline: 'Drogo, ale wracam',
    body: 'Smakuje świetnie, ale przyzwyczaiłem się do taniego. Wracam po Wasze mimo portfela. Dwie gwiazdki za cenę, pięć za smak.',
    name: 'Grzegorz Malinowski',
    avatarSrc: pfps[3],
  },
]

const loopedReviews = [...reviews, ...reviews]

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex justify-center gap-1"
      aria-label={`Ocena ${rating} na 5 gwiazdek`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-7 w-7 sm:h-8 sm:w-8 ${i < rating ? 'fill-brand-yellow' : 'fill-neutral-300'}`}
          aria-hidden="true"
        >
          <path d="M13.9106 2.19626C13.1419 0.601249 10.859 0.601246 10.0903 2.19626L8.0752 6.37748C8.06014 6.40873 8.02726 6.43524 7.98348 6.44095L3.34448 7.04641C1.58974 7.27543 0.857205 9.43807 2.16525 10.6675L5.55884 13.8571C5.58649 13.8831 5.59633 13.9178 5.59045 13.9492L4.7385 18.5047C4.40845 20.2694 6.28218 21.5748 7.82789 20.7441L11.9403 18.5342C11.9775 18.5142 12.0234 18.5142 12.0605 18.5342L16.173 20.7441C17.7187 21.5748 19.5924 20.2694 19.2624 18.5047L18.4104 13.9492C18.4046 13.9178 18.4144 13.8831 18.442 13.8571L21.8356 10.6675C23.1437 9.43807 22.4111 7.27543 20.6564 7.04641L16.0174 6.44095C15.9736 6.43524 15.9407 6.40873 15.9257 6.37748L13.9106 2.19626Z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const offsetClass = index % 2 === 0 ? '-translate-y-6' : 'translate-y-6'

  return (
    <article
      className={`flex h-full w-[min(85vw,300px)] shrink-0 flex-col items-center rounded-2xl bg-warm-cream px-6 py-10 text-center sm:w-[300px] sm:px-8 sm:py-12 ${offsetClass}`}
    >
      <StarRating rating={review.rating} />

      <h3 className="mt-6 font-heading text-2xl font-bold leading-tight tracking-[-0.02em] text-black sm:mt-8 sm:text-3xl">
        {review.headline}
      </h3>

      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-black sm:mt-5 sm:text-base">
        {review.body}
      </p>

      <div className="mt-8 sm:mt-10">
        <img
          src={review.avatarSrc}
          alt={review.name}
          className="h-16 w-16 rounded-xl object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
        />
      </div>
    </article>
  )
}

export default function ReviewsSection() {
  return (
    <section className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden bg-white py-20 sm:py-28">
      <div className="overflow-hidden py-10">
        <div className="animate-reviews-marquee flex w-max items-center gap-4">
          {loopedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
