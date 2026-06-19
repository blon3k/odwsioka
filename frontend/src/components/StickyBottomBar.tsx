import { useEffect, useRef, useState } from 'react'
import BrutalistButton from './BrutalistButton'

const BOTTOM_OFFSET_PX = 8

type StickyBottomBarProps = {
  onVisibilityChange?: (visible: boolean) => void
  onHeightChange?: (height: number) => void
}

export default function StickyBottomBar({
  onVisibilityChange,
  onHeightChange,
}: StickyBottomBarProps) {
  const [visible, setVisible] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = !entry.isIntersecting
        setVisible(nextVisible)
        onVisibilityChange?.(nextVisible)
      },
      { threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [onVisibilityChange])

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const reportHeight = () => onHeightChange?.(bar.offsetHeight)

    reportHeight()

    const resizeObserver = new ResizeObserver(reportHeight)
    resizeObserver.observe(bar)
    return () => resizeObserver.disconnect()
  }, [onHeightChange])

  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 z-40 flex justify-center px-2">
      <div
        ref={barRef}
        className={`pointer-events-auto w-full max-w-5xl overflow-hidden rounded-[8px] border-2 border-black bg-warm-cream shadow-[4px_4px_0_0_#000] transition-transform duration-300 motion-reduce:transition-none ${
          visible ? 'translate-y-0' : 'translate-y-[calc(100%+0.5rem)]'
        }`}
        aria-hidden={!visible}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
          <p className="font-heading text-xl font-bold uppercase tracking-tight text-black sm:text-2xl">
            Pakiet startowy
          </p>
          <BrutalistButton size="sm" onClick={scrollToOffer}>
            Zobacz ofertę
          </BrutalistButton>
        </div>
      </div>
    </div>
  )
}

export { BOTTOM_OFFSET_PX }
