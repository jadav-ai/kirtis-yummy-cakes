import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { SiteHeader } from "@/components/site-header"
import { MobileFab } from "@/components/mobile-fab"
import { Hero } from "@/components/sections/hero"
import { Storytelling } from "@/components/sections/storytelling"
import { About } from "@/components/sections/about"
import { CakeShowcase } from "@/components/sections/cake-showcase"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"
import { Cta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <CustomCursor />
      <SiteHeader />

      <main>
        <Hero />
        <Storytelling />
        <About />
        <CakeShowcase />
        <Stats />
        <Testimonials />
        <Cta />
        <Faq />
      </main>

      <Footer />
      <MobileFab />
    </>
  )
}
