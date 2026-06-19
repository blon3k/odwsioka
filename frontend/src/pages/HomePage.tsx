import { useCallback, useState } from 'react'
import AboutUsSection from '../components/AboutUsSection'
import BenefitsSection from '../components/BenefitsSection'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ProblemCardsSection from '../components/ProblemCardsSection'
import ProductShowcaseSection from '../components/ProductShowcaseSection'
import ReviewsSection from '../components/ReviewsSection'
import SingleReviewSection from '../components/SingleReviewSection'
import StickyBottomBar, { BOTTOM_OFFSET_PX } from '../components/StickyBottomBar'
import WimpSection from '../components/WimpSection'

export default function HomePage() {
  const [stickyBarVisible, setStickyBarVisible] = useState(false)
  const [stickyBarHeight, setStickyBarHeight] = useState(0)

  const handleStickyBarVisibility = useCallback((visible: boolean) => {
    setStickyBarVisible(visible)
  }, [])

  const handleStickyBarHeight = useCallback((height: number) => {
    setStickyBarHeight(height)
  }, [])

  const stickyBarPadding =
    stickyBarVisible && stickyBarHeight > 0
      ? stickyBarHeight + BOTTOM_OFFSET_PX + 16
      : undefined

  return (
    <div
      className="flex min-w-0 flex-col gap-2 overflow-x-clip bg-white p-2 transition-[padding-bottom] duration-300 motion-reduce:transition-none"
      style={{ paddingBottom: stickyBarPadding }}
    >
      <Navbar />
      <Hero />
      <WimpSection />
      <ProblemCardsSection />
      <BenefitsSection />
      <ProductShowcaseSection />
      <ReviewsSection />
      <SingleReviewSection />
      <AboutUsSection />
      <Footer />
      <StickyBottomBar
        onVisibilityChange={handleStickyBarVisibility}
        onHeightChange={handleStickyBarHeight}
      />
    </div>
  )
}
