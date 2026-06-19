import pfp from '../assets/pfp/5996edd07b2cc8909cfb26968dcb2c92.jpg'

type SingleReviewSectionProps = {
  quote: string
  name: string
  title: string[]
  avatarSrc?: string
  avatarAlt?: string
}

const defaultReview: SingleReviewSectionProps = {
  quote:
    'Po raz pierwszy czuję różnicę między sklepowym mlekiem a prawdziwym. Gęste, białe, pełne smaku. Cała rodzina przeszła na Wasze produkty.',
  name: 'Kasia Nowak',
  title: ['Stała klientka'],
  avatarSrc: pfp,
}

function ReviewerAvatar({ src, alt, name }: { src?: string; alt: string; name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-20 w-20 shrink-0 rounded-full object-cover sm:h-24 sm:w-24"
      />
    )
  }

  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-body text-base font-semibold text-neutral-600 sm:h-24 sm:w-24 sm:text-lg"
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function SingleReviewSection({
  quote = defaultReview.quote,
  name = defaultReview.name,
  title = defaultReview.title,
  avatarSrc = defaultReview.avatarSrc,
  avatarAlt,
}: Partial<SingleReviewSectionProps> = {}) {
  return (
    <section className="overflow-hidden rounded-[8px] bg-white px-6 py-24 sm:px-12 sm:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 sm:gap-16">
        <blockquote className="text-center font-heading text-4xl font-bold italic leading-[110%] tracking-[-0.02em] text-black sm:text-5xl md:text-6xl lg:text-7xl">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <figcaption className="flex items-center gap-8 sm:gap-10 md:gap-12">
          <ReviewerAvatar src={avatarSrc} alt={avatarAlt ?? name} name={name} />

          <div className="text-center">
            <p className="font-heading text-xl font-bold text-black sm:text-2xl md:text-3xl">{name}</p>
            {title.map((line) => (
              <p key={line} className="font-body text-sm leading-snug text-neutral-500 sm:text-base">
                {line}
              </p>
            ))}
          </div>
        </figcaption>
      </div>
    </section>
  )
}
