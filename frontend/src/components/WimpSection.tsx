function AnimatedUdawanie() {
  return (
    <span className="relative inline-block">
      <span className="animate-jitter inline-block">udawaniem</span>
      <span
        className="animate-strikethrough absolute left-0 top-[52%] h-[3px] w-full origin-left bg-black sm:h-1"
        aria-hidden="true"
      />
    </span>
  )
}

function AnimatedZzz() {
  return (
    <span
      className="relative ml-0.5 inline-block h-8 w-10 align-middle sm:h-10 sm:w-14"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-zzz absolute text-lg font-normal text-neutral-400 sm:text-2xl"
          style={{
            left: `${i * 9}px`,
            bottom: `${(2 - i) * 4}px`,
            animationDelay: `${i * 0.45}s`,
          }}
        >
          z
        </span>
      ))}
    </span>
  )
}

const textClass =
  'font-heading text-5xl font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]'

export default function WimpSection() {
  return (
    <section className="overflow-hidden rounded-[8px] bg-white px-6 py-28 sm:px-12 sm:py-40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-20 text-center sm:gap-28">
        <p className={textClass}>
          Surowe mleko,
          <br />
          ser i miód
          <br />
          prosto od gospodarstwa.
        </p>

        <p className={textClass}>
          Pełnowartościowy nabiał,
          <br />
          białko, wapń i pełny smak,
          <br />
          koniec z <AnimatedUdawanie />,
          <br />
          świeżość od krowy,
          <br />
          <span className="inline-flex items-end justify-center">
            sen
            <AnimatedZzz />
          </span>
          {' '}
          lepszej jakości,
          <br />
          energia z miodu,
          <br />
          siła sera w każdym kęsie.
        </p>

        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <p className={textClass}>
            Mleko daje bazę.
            <br />
            Miód daje energię.
            <br />
            Ser daje siłę.
          </p>

          <p className="max-w-2xl font-body text-lg font-normal leading-relaxed text-black sm:text-xl md:text-2xl">
            To nie to samo co mleko ze sklepu. Prosty skład, prawdziwy smak i produkty od
            lokalnych rolników, których możesz poznać.
          </p>
        </div>
      </div>
    </section>
  )
}
