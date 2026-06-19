import bundleImage from '../assets/bundle.png'

const bgVideo = '/bgvideo.mp4'
import BrutalistButton from './BrutalistButton'
import FeatureBar from './FeatureBar'

function StarRating() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="none" className="h-5 w-5 fill-brand-yellow">
            <path d="M13.9106 2.19626C13.1419 0.601249 10.859 0.601246 10.0903 2.19626L8.0752 6.37748C8.06014 6.40873 8.02726 6.43524 7.98348 6.44095L3.34448 7.04641C1.58974 7.27543 0.857205 9.43807 2.16525 10.6675L5.55884 13.8571C5.58649 13.8831 5.59633 13.9178 5.59045 13.9492L4.7385 18.5047C4.40845 20.2694 6.28218 21.5748 7.82789 20.7441L11.9403 18.5342C11.9775 18.5142 12.0234 18.5142 12.0605 18.5342L16.173 20.7441C17.7187 21.5748 19.5924 20.2694 19.2624 18.5047L18.4104 13.9492C18.4046 13.9178 18.4144 13.8831 18.442 13.8571L21.8356 10.6675C23.1437 9.43807 22.4111 7.27543 20.6564 7.04641L16.0174 6.44095C15.9736 6.43524 15.9407 6.40873 15.9257 6.37748L13.9106 2.19626Z" />
          </svg>
        ))}
      </div>
      <span className="text-base font-medium text-black">4.8/5</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="w-full min-w-0 overflow-x-clip">
      <div className="relative grid min-h-[min(92vh,900px)] w-full min-w-0 gap-[8px] lg:grid-cols-[4fr_6fr]">
        <img
          src={bundleImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[calc(40%-4px)] z-20 hidden w-[min(560px,50vw)] -translate-x-1/2 -translate-y-1/2 object-contain lg:block"
        />

        <div className="relative z-10 min-h-[420px] w-full min-w-0 rounded-[8px] bg-neutral-200 lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full max-w-full object-cover object-center"
              aria-label="Background video"
            >
              <source src={bgVideo} type="video/mp4" />
            </video>
          </div>
          <img
            src={bundleImage}
            alt="Pakiet produktów: mleko, ser i miód"
            className="pointer-events-none absolute bottom-8 left-1/2 z-10 w-[min(360px,78vw)] max-w-full -translate-x-1/2 translate-y-1/2 object-contain sm:bottom-10 sm:w-[min(460px,64vw)] lg:hidden"
          />
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center rounded-[8px] bg-warm-cream px-8 pb-20 pt-28 text-center sm:pt-32 lg:overflow-hidden lg:px-16 lg:py-20">
          <h1 className="max-w-full font-heading text-8xl font-bold uppercase leading-[0.9] tracking-[-4px] text-black sm:text-9xl lg:text-[11rem]">
            Prawdziwe
            <br />
            Mleko
          </h1>

          <p className="mt-10 text-xl text-black sm:text-2xl">
            &ldquo;Pełnowartościowy nabiał, nie ze sklepowej półki&rdquo;
          </p>

          <div className="mt-6">
            <StarRating />
          </div>

          <BrutalistButton className="mt-10" to="/oferta">
            Zamów pakiet startowy
          </BrutalistButton>
        </div>
      </div>

      <FeatureBar />
    </section>
  )
}
