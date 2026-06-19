import type { ReactNode } from 'react'
import { benefitFeatures } from './benefitFeatures'

function BenefitCard({
  title,
  body,
  icon,
}: {
  title: string
  body: string
  icon: (className: string) => ReactNode
}) {
  return (
    <article className="relative flex flex-col items-center rounded-2xl bg-warm-cream px-8 pb-12 pt-16 text-center sm:px-10 sm:pb-14 sm:pt-20">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-black sm:-top-12">
        {icon('h-20 w-20 sm:h-24 sm:w-24')}
      </div>
      <h3 className="font-heading text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-black sm:text-3xl">{title}</h3>
      <p className="mt-4 font-body text-base leading-relaxed text-black sm:text-lg">{body}</p>
    </article>
  )
}

export default function BenefitsSection() {
  return (
    <section
      id="dlaczego-my"
      className="overflow-visible rounded-[8px] bg-white px-4 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <h2 className="text-center font-heading text-6xl font-bold leading-[0.95] tracking-[-0.03em] text-black sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem]">
        Co dostajesz
      </h2>

      <div className="mx-auto mt-16 grid max-w-[90rem] gap-1 pt-10 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
        {benefitFeatures.map((benefit) => (
          <BenefitCard key={benefit.title} {...benefit} />
        ))}
      </div>
    </section>
  )
}
