"use client"

import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, type MouseEvent } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLowPerf } from "@/hooks/use-low-perf"
import { InstagramButton } from "@/components/instagram-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type Cake = {
  num: string
  title: string
  image: string
  alt: string
  imagePosition?: string
  specs: [string, string, string]
  description: string
}

const CAKES: Cake[] = [
  {
    num: "01",
    title: "3D Sculpted Art Cakes",
    image: "/images/cakes/sculpted/01-hero.png",
    alt: "Colorful 3D sculpted artistic cake with edible tools and candy accents",
    imagePosition: "center top",
    specs: ["SCULPTED ART", "BESPOKE DESIGN", "SHOWPIECE"],
    description:
      "For celebrations that deserve a conversation starter. Hand‑sculpted details with playful edible artistry.",
  },
  {
    num: "02",
    title: "Kids Theme Cakes",
    image: "/images/cakes/theme-kids/01-hero.png",
    alt: "Superhero themed two-tier cake with comic logos and character toppers",
    imagePosition: "center 38%",
    specs: ["THEME CAKE", "SUPERHERO", "KIDS PARTY"],
    description:
      "Bold colors, iconic characters, and sharp fondant detailing for unforgettable reveals.",
  },
  {
    num: "03",
    title: "Anniversary Tier Cakes",
    image: "/images/cakes/anniversary/01-hero.png",
    alt: "Romantic two-tier anniversary cake with floral accents and gold leaf details",
    imagePosition: "center 40%",
    specs: ["ANNIVERSARY", "ELEGANT FLORALS", "MULTI-TIER"],
    description:
      "Soft palettes, floral romance, and luxe accents designed to mirror your story.",
  },
  {
    num: "04",
    title: "Theme Cakes",
    image: "/images/cakes/theme-space/01-hero.png",
    alt: "Astronaut themed custom cake with moon surface base and space decorations",
    imagePosition: "center 30%",
    specs: ["THEME CAKE", "SPACE STORY", "CUSTOM TOPPERS"],
    description:
      "A cinematic space concept with handcrafted toppers and premium finishing.",
  },
  {
    num: "05",
    title: "Baby Shower Cakes",
    image: "/images/cakes/baby/01-hero.png",
    alt: "Pastel pink and blue baby shower tier cake with welcome baby topper",
    imagePosition: "center 42%",
    specs: ["BABY SHOWER", "PASTEL FINISH", "WELCOME TOPPER"],
    description:
      "Delicate colors and charming baby motifs crafted for joyful celebrations.",
  },
  {
    num: "06",
    title: "Tier Birthday Cakes",
    image: "/images/cakes/tier-birthday/01-hero.png",
    alt: "Elegant white multi-tier milestone birthday cake with floral accents",
    imagePosition: "center 33%",
    specs: ["TIER CAKE", "BIRTHDAY", "MILESTONE"],
    description:
      "Structured tiers with refined textures for sophisticated milestone setups.",
  },
  {
    num: "07",
    title: "Drip & Choco Cakes",
    image: "/images/cakes/chocolate/01-hero.jpg",
    alt: "Chocolate drip cake with rich ganache and elegant celebration styling",
    imagePosition: "center 45%",
    specs: ["CELEBRATIONS", "DARK GANACHE", "BERRIES"],
    description:
      "Rich ganache waterfalls, decadent toppings, pure chocolate‑forward indulgence.",
  },
  {
    num: "08",
    title: "Theme Cakes",
    image: "/images/cakes/theme-general/01-hero.jpg",
    alt: "Custom themed birthday cake with decorative fondant elements",
    imagePosition: "center center",
    specs: ["BIRTHDAYS", "CUSTOM THEME", "YOUR STORY"],
    description:
      "From birthdays to baby showers, each theme cake is designed around your story.",
  },
]

function CakeCard({ cake, tilt }: { cake: Cake; tilt: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
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
      className="relative shrink-0 w-full sm:w-[360px] md:w-[420px] h-[74vh] md:h-[82vh] max-h-[760px] flex flex-col"
    >
      <div className="relative flex-[0_0_62%] md:flex-[0_0_82%] overflow-hidden gold-shimmer">
        <Image
          src={cake.image}
          alt={cake.alt}
          fill
          priority={cake.num === "01" || cake.num === "02"}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.05]"
          style={{ objectPosition: cake.imagePosition ?? "center center" }}
          sizes="(min-width: 1024px) 420px, 360px"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between p-5 md:p-6" style={{ background: "var(--cream)" }}>
        <div>
          <h3
            className="font-serif text-[28px] md:text-[34px] lg:text-[38px] leading-[1.05]"
            style={{ color: "var(--dark-rose)" }}
          >
            {cake.title}
          </h3>
          <p
            className="mt-3 text-[13px] md:text-[14px] leading-[1.65] line-clamp-3"
            style={{ color: "var(--muted)" }}
          >
            {cake.description}
          </p>
        </div>
        <div>
          <div className="mt-4 flex flex-wrap gap-1 md:gap-1.5">
            {cake.specs.map((s) => (
              <span
                key={s}
                className="rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase md:px-2.5 md:py-1 md:text-[10px]"
                style={{ background: "var(--blush)", color: "var(--void)" }}
              >
                {s}
              </span>
            ))}
          </div>
          <a
            href={`https://wa.me/917990797634?text=${encodeURIComponent(
              `Hi Kirti, I would like to order your ${cake.title}. Please share size and flavour options.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-5 inline-flex items-center gap-2 font-serif text-[15px] italic outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
            style={{ color: "var(--champagne)" }}
          >
            <span>ORDER THIS →</span>
            <span
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
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
      const track = trackRef.current
      if (!track) return
      const totalScroll = track.scrollWidth - window.innerWidth + 80

      const tween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
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

    ScrollTrigger.refresh()

    return () => mm.revert()
  }, [])

  return (
    <section
      id="cakes"
      className="relative w-full"
      style={{ backgroundColor: "var(--cream)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-16 text-center md:px-12 md:pb-12 md:pt-20">
        <p
          className="mb-4 text-[10px] uppercase tracking-[0.45em]"
          style={{ color: "var(--champagne)" }}
        >
          Our Signature Creations
        </p>
        <h2
          className="text-balance font-serif text-[11vw] leading-[1.02] sm:text-[44px] md:text-[72px] lg:text-[96px]"
          style={{ color: "var(--dark-rose)" }}
        >
          Eight Ways to
          <br />
          <span className="italic" style={{ color: "var(--blush)" }}>
            Say I Love You.
          </span>
        </h2>
        <svg
          className="mx-auto mt-5 md:mt-6"
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

      <div ref={wrapperRef} className="relative hidden w-full overflow-hidden md:block">
        <div
          ref={trackRef}
          className="flex gap-7 px-12 will-change-transform lg:gap-10 lg:px-20"
          style={{ minHeight: "100vh", alignItems: "center" }}
        >
          {CAKES.map((c) => (
            <div key={c.num} className="group">
              <CakeCard cake={c} tilt={!low} />
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-6 left-1/2 h-[2px] w-[60%] -translate-x-1/2"
          style={{ background: "rgba(212,175,55,0.28)" }}
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0"
            style={{ background: "var(--champagne)" }}
          />
        </div>
      </div>

      <div className="flex overflow-x-auto hide-scroll snap-x snap-mandatory px-6 pb-6 gap-6 md:hidden">
        {CAKES.map((c) => (
          <div key={c.num} className="shrink-0 w-[85vw] snap-center group">
            <CakeCard cake={c} tilt={false} />
          </div>
        ))}
      </div>
      <div className="flex md:hidden justify-center gap-1.5 pb-8 opacity-40">
        <div className="text-[10px] tracking-[0.2em] uppercase">Swipe to explore</div>
      </div>

      <div className="pb-12 md:pb-14 text-center">
        <InstagramButton
          variant="outline"
          showIcon
          className="px-6 py-3 text-[13px] md:text-[14px] !text-[color:var(--dark-rose)] hover:!text-[color:var(--void)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--cream)]"
        >
          View More on Instagram
        </InstagramButton>
      </div>
    </section>
  )
}
