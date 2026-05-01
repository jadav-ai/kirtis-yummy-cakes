"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, type MouseEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLowPerf } from "@/hooks/use-low-perf"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Cake = {
  num: string
  title: string
  image: string
  specs: [string, string, string]
  description: string
}

const CAKES: Cake[] = [
  {
    num: "01",
    title: "3D Sculpted Cakes",
    image: "/images/cake-01.jpg",
    specs: ["ALL EVENTS", "SCULPTED ART", "CUSTOM"],
    description:
      "Why settle for ordinary when you can have extraordinary? Our 3D sculpted cakes are edible masterpieces — carved, shaped and crafted to leave everyone completely speechless.",
  },
  {
    num: "02",
    title: "Custom Photo Cakes",
    image: "/images/cake-02.jpg",
    specs: ["BIRTHDAYS", "EDIBLE PRINT", "FONDANT"],
    description:
      "Your most treasured memories, deliciously preserved. We print your favourite photos with food-safe edible ink onto silky-smooth fondant that makes every moment the centrepiece.",
  },
  {
    num: "03",
    title: "Fondant Cakes",
    image: "/images/cake-03.jpg",
    specs: ["ALL EVENTS", "HAND-ROLLED", "INTRICATE"],
    description:
      "Flawlessly smooth, endlessly imaginative. Hand-rolled fondant sheets sculpted with intricate designs and textures that are almost too beautiful to eat — almost.",
  },
  {
    num: "04",
    title: "Tier & Wedding Cakes",
    image: "/images/cake-04.jpg",
    specs: ["WEDDINGS", "MULTI-TIER", "FLOWERS & LACE"],
    description:
      "Tall, majestic, unforgettable. Our tiered wedding cakes are designed to match your dream day — layered with love, draped in elegance, and filled with flavours that demand a second slice.",
  },
  {
    num: "05",
    title: "Drip & Choco Cakes",
    image: "/images/cake-05.jpg",
    specs: ["CELEBRATIONS", "DARK GANACHE", "BERRIES"],
    description:
      "For the ones who believe chocolate makes everything better. Rich ganache waterfalls, decadent toppings, fresh berries — pure unapologetic bliss on a plate.",
  },
  {
    num: "06",
    title: "Cupcake Towers",
    image: "/images/cake-06.jpg",
    specs: ["PARTIES", "ROSETTE PIPED", "12 TO 100"],
    description:
      "A little cake for every guest. Individually piped, beautifully decorated, and stacked into a show-stopping centrepiece that doubles as the most charming dessert table.",
  },
  {
    num: "07",
    title: "Vegan Cakes",
    image: "/images/cake-07.jpg",
    specs: ["INCLUSIVE", "VEGAN", "FULL FLAVOUR"],
    description:
      "Because everyone deserves a slice of joy. The same moist, fluffy, flavour-packed experience — crafted with plant-based love, inclusive for every guest at your table.",
  },
  {
    num: "08",
    title: "Theme Cakes",
    image: "/images/cake-08.jpg",
    specs: ["BIRTHDAYS", "CUSTOM THEME", "YOUR STORY"],
    description:
      "From birthday bashes to baby showers, our theme cakes bring your wildest vision to life. Unicorns, superheroes, florals — we design around your story, one tier at a time.",
  },
]

function CakeCard({ cake, tilt }: { cake: Cake; tilt: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // Softer springs: less stiffness = fewer RAF iterations to settle.
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 90,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 90,
    damping: 18,
  })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    if (!tilt) return
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={tilt ? onMove : undefined}
      onMouseLeave={tilt ? onLeave : undefined}
      data-cursor-label="EXPLORE"
      style={tilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className="relative shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[74vh] md:h-[82vh] max-h-[760px] flex flex-col"
    >
      {/* Number watermark */}
      <span
        className="absolute top-2 right-3 font-serif text-[140px] md:text-[180px] leading-none select-none pointer-events-none"
        style={{ color: "var(--champagne)", opacity: 0.08 }}
      >
        {cake.num}
      </span>

      {/* Image */}
      <div className="relative flex-[0_0_65%] overflow-hidden gold-shimmer">
        <Image
          src={cake.image}
          alt={cake.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]"
          sizes="(min-width: 1024px) 420px, 360px"
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 flex flex-col justify-between p-6 md:p-7"
        style={{ background: "var(--cream)" }}
      >
        <div>
          <h3
            className="font-serif text-[30px] md:text-[40px] lg:text-[44px] leading-[1.05]"
            style={{ color: "var(--dark-rose)" }}
          >
            {cake.title}
          </h3>
          <p
            className="mt-4 text-[13px] md:text-[14px] leading-[1.7] line-clamp-4"
            style={{ color: "var(--muted)" }}
          >
            {cake.description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mt-5">
            {cake.specs.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[9px] md:text-[10px] tracking-[0.15em] uppercase"
                style={{ background: "var(--blush)", color: "var(--void)" }}
              >
                {s}
              </span>
            ))}
          </div>

          <a
            href="https://wa.me/917990797634"
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-5 inline-flex items-center gap-2 font-serif italic text-[15px] group"
            style={{ color: "var(--champagne)" }}
          >
            <span>ORDER THIS →</span>
            <span
              className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
              style={{ background: "var(--champagne)" }}
            />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function CakeShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const low = useLowPerf()

  useEffect(() => {
    if (!wrapperRef.current || !trackRef.current) return
    const mm = gsap.matchMedia()

    mm.add("(min-width: 900px)", () => {
      const track = trackRef.current!
      const totalScroll = track.scrollWidth - window.innerWidth + 80

      const tween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          // Tighter scrub = less work per frame on weaker GPUs.
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="cakes"
      className="relative w-full"
      style={{ backgroundColor: "var(--cream)" }}
    >
      {/* Heading */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20 text-center">
        <p
          className="text-[10px] tracking-[0.45em] uppercase mb-4"
          style={{ color: "var(--champagne)" }}
        >
          Our Signature Creations
        </p>
        <h2
          className="font-serif text-[11vw] sm:text-[44px] md:text-[72px] lg:text-[96px] leading-[1.02] text-balance"
          style={{ color: "var(--dark-rose)" }}
        >
          Eight Ways to
          <br />
          <span className="italic" style={{ color: "var(--blush)" }}>
            Say I Love You.
          </span>
        </h2>
        <p
          className="mt-5 text-[15px]"
          style={{ color: "var(--muted)" }}
        >
          Every category. Every occasion. Every memory.
        </p>
        <svg
          className="mx-auto mt-8"
          width="160"
          height="12"
          viewBox="0 0 160 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 6 Q 40 0 80 6 T 158 6" stroke="var(--champagne)" strokeWidth="0.8" />
          <circle cx="80" cy="6" r="2" fill="var(--champagne)" />
        </svg>
      </div>

      {/* Horizontal scroll (desktop) / horizontal scroll-x (mobile fallback) */}
      <div ref={wrapperRef} className="relative w-full overflow-hidden hidden md:block">
        <div
          ref={trackRef}
          className="flex gap-7 lg:gap-10 will-change-transform px-12 lg:px-20"
          style={{ minHeight: "100vh", alignItems: "center" }}
        >
          {CAKES.map((c) => (
            <div key={c.num} className="group">
              <CakeCard cake={c} tilt={!low} />
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-px"
          style={{ background: "rgba(212,175,55,0.2)" }}
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--champagne)" }}
          />
        </div>
      </div>

      {/* Mobile — vertical grid (horizontal pinning is desktop-only) */}
      <div className="md:hidden grid grid-cols-1 gap-10 px-6 pb-20">
        {CAKES.map((c) => (
          <div key={c.num} className="group">
            <CakeCard cake={c} tilt={false} />
          </div>
        ))}
      </div>
    </section>
  )
}
