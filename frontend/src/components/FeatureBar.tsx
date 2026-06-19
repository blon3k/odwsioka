import { benefitFeatures } from './benefitFeatures'

export default function FeatureBar() {
  return (
    <div className="bg-white px-4 py-12 sm:px-6 sm:py-14">
      <ul className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-x-4 gap-y-8 sm:max-w-none sm:gap-x-7 sm:gap-y-10 lg:flex lg:max-w-none lg:flex-nowrap lg:items-start lg:justify-center lg:gap-9">
        {benefitFeatures.map((feature) => (
          <li key={feature.title} className="flex flex-col items-center gap-2 text-center">
            <span className="font-heading text-xs font-bold uppercase leading-tight tracking-[1px] text-black sm:text-base lg:text-lg lg:whitespace-nowrap">
              {feature.title}
            </span>
            <span className="shrink-0 text-black">{feature.icon('h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
