"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Scroll-scrubbed, pinned editorial storytelling sequence.
 * 280vh of scroll space -> 3 overlapping steps.
 * Background transitions void -> dark-rose -> cream via opacity cross-fade
 * between stacked pre-rendered color layers (no paint-heavy backgroundColor
 * interpolation).
 */
export function Storytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const bgVoid = useRef<HTMLDivElement>(null)
  const bgRose = useRef<HTMLDivElement>(null)
  const bgCream = useRef<HTMLDivElement>(null)
  const step1 = useRef<HTMLDivElement>(null)
  const step2 = useRef<HTMLDivElement>(null)
  const step3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=280%",
          pin: pinRef.current,
          scrub: 0.6,
        },
      })

      // Cross-fade bg layers (opacity-only = GPU compositing, no paint).
      tl.to(bgRose.current, { opacity: 1, duration: 0.6 }, 0.4)
        .to(bgVoid.current, { opacity: 0, duration: 0.6 }, 0.4)
        .to(bgCream.current, { opacity: 1, duration: 0.6 }, 1.5)
        .to(bgRose.current, { opacity: 0, duration: 0.6 }, 1.5)

      tl.fromTo(
        step1.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3 },
        0,
      ).to(step1.current, { opacity: 0, y: -30, duration: 0.3 }, 0.7)

      tl.fromTo(
        step2.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.8,
      ).to(step2.current, { opacity: 0, y: -30, duration: 0.4 }, 1.6)

      tl.fromTo(
        step3.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        1.7,
      ).to(step3.current, { opacity: 0, y: -20, duration: 0.4 }, 2.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={pinRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* Stacked bg layers — cross-fade instead of animating backgroundColor */}
        <div ref={bgVoid} className="absolute inset-0" style={{ backgroundColor: "var(--void)" }} />
        <div
          ref={bgRose}
          className="absolute inset-0"
          style={{ backgroundColor: "#5a2634", opacity: 0 }}
        />
        <div
          ref={bgCream}
          className="absolute inset-0"
          style={{ backgroundColor: "var(--cream)", opacity: 0 }}
        />
        <div className="grain-overlay grain-dark absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] px-6 text-center">
          <div ref={step1} className="absolute inset-0 flex items-center justify-center">
            <h2
              className="font-serif font-light text-[12vw] sm:text-[54px] md:text-[92px] lg:text-[118px] leading-[0.95] text-balance"
              style={{ color: "var(--ivory)" }}
            >
              NOT JUST CAKE.
            </h2>
          </div>

          <div
            ref={step2}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
          >
            <h2
              className="font-serif italic text-[12vw] sm:text-[56px] md:text-[100px] lg:text-[130px] leading-[0.95] text-balance"
              style={{ color: "var(--blush)" }}
            >
              A LOVE LANGUAGE.
            </h2>
            <p
              className="text-[13px] tracking-[0.3em] uppercase"
              style={{ color: "rgba(253,250,246,0.65)" }}
            >
              Every order is made fresh, by hand, by heart.
            </p>
          </div>

          <div
            ref={step3}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          >
            <h2
              className="font-serif text-[11vw] sm:text-[48px] md:text-[80px] lg:text-[108px] leading-[0.95] text-balance"
              style={{ color: "var(--champagne)" }}
            >
              YOUR MOMENT.
            </h2>
            <h2
              className="font-serif italic text-[10vw] sm:text-[40px] md:text-[72px] lg:text-[96px] leading-[0.95] text-balance"
              style={{ color: "var(--gold-light)" }}
            >
              HER MASTERPIECE.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
