"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Scroll-scrubbed, pinned editorial storytelling sequence.
 * 280vh of scroll space -> 4 overlapping steps.
 * Background scrubs void -> cream across the section.
 */
export function Storytelling() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
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
          scrub: 1.5,
        },
      })

      // bg: void -> dark-rose -> cream
      tl.to(
        bgRef.current,
        { backgroundColor: "#3a1823", duration: 0.5 },
        0,
      )
        .to(bgRef.current, { backgroundColor: "#7a3847", duration: 0.5 }, 0.5)
        .to(bgRef.current, { backgroundColor: "#FFF8F0", duration: 0.5 }, 1.5)

      // step1 visible 0 -> 0.3
      tl.fromTo(
        step1.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3 },
        0,
      )
        .to(step1.current, { opacity: 0, y: -30, duration: 0.3 }, 0.7)

      // step2 0.7 -> 1.6
      tl.fromTo(
        step2.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.8,
      )
        .to(step2.current, { opacity: 0, y: -30, duration: 0.4 }, 1.6)

      // step3 1.6 -> 2.4
      tl.fromTo(
        step3.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4 },
        1.7,
      )
        .to(step3.current, { opacity: 0, y: -20, duration: 0.4 }, 2.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={pinRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <div
          ref={bgRef}
          className="absolute inset-0 transition-colors"
          style={{ backgroundColor: "var(--void)" }}
        />
        <div className="grain-overlay grain-dark absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] px-6 text-center">
          <div
            ref={step1}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h2
              className="font-serif font-light text-[54px] md:text-[92px] lg:text-[118px] leading-[0.95] text-balance"
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
              className="font-serif italic text-[56px] md:text-[100px] lg:text-[130px] leading-[0.95] text-balance"
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
              className="font-serif text-[48px] md:text-[80px] lg:text-[108px] leading-[0.95] text-balance"
              style={{ color: "var(--champagne)" }}
            >
              YOUR MOMENT.
            </h2>
            <h2
              className="font-serif italic text-[40px] md:text-[72px] lg:text-[96px] leading-[0.95] text-balance"
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
