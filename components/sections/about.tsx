"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const WORDS_1 = "Made with Heart,".split(" ")
const WORDS_2 = "Baked with Soul.".split(" ")

export function About() {
  return (
    <section id="about" className="relative w-full py-24 md:py-36" style={{ backgroundColor: "var(--cream)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT — image */}
          <div className="relative">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden"
            >
              <Image
                src="/images/about-kirti.jpg"
                alt="Kirti's hands piping delicate cream rosettes onto a pastel cake"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </motion.div>

            {/* Gold corner flourish */}
            <svg
              className="absolute -top-4 -left-4 w-20 h-20"
              viewBox="0 0 80 80"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 40 C 2 20, 20 2, 40 2"
                stroke="var(--champagne)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M10 40 C 10 25, 25 10, 40 10"
                stroke="var(--champagne)"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.6"
              />
              <circle cx="3" cy="40" r="1.5" fill="var(--champagne)" />
              <circle cx="40" cy="3" r="1.5" fill="var(--champagne)" />
            </svg>

            {/* Floating ingredient emojis */}
            <div className="absolute -bottom-4 -right-4 text-4xl bob" aria-hidden="true">
              🧈
            </div>
            <div className="absolute top-8 -right-8 text-3xl bob-slow" aria-hidden="true">
              🥚
            </div>
            <div className="absolute top-1/2 -left-8 text-3xl bob-slower" aria-hidden="true">
              🍰
            </div>
          </div>

          {/* RIGHT — text */}
          <div>
            <p
              className="text-[10px] tracking-[0.45em] uppercase mb-5"
              style={{ color: "var(--champagne)" }}
            >
              The Story Behind Every Slice
            </p>

            <h2
              className="font-serif text-[44px] md:text-[58px] lg:text-[72px] leading-[1.02] text-balance"
              style={{ color: "var(--dark-rose)" }}
            >
              <span className="inline-flex flex-wrap gap-x-3">
                {WORDS_1.map((w, i) => (
                  <motion.span
                    key={`w1-${i}`}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-flex flex-wrap gap-x-3 italic" style={{ color: "var(--blush)" }}>
                {WORDS_2.map((w, i) => (
                  <motion.span
                    key={`w2-${i}`}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      delay: WORDS_1.length * 0.08 + i * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p
              className="mt-8 max-w-[460px] text-[16px] leading-[1.9]"
              style={{ color: "var(--muted)" }}
            >
              Hi, I&apos;m Kirti — and I&apos;ve been baking joy for over a decade. What started as
              a passion for creating birthday surprises for my family slowly became something I
              couldn&apos;t stop doing. Every cake I make is built from scratch, with the finest
              ingredients and an obsessive eye for detail. No shortcuts. No compromises. Just pure,
              honest love in every layer.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mt-10">
              {[
                { n: 500, suffix: "+", label: "Happy Customers" },
                { n: 8, suffix: "+", label: "Cake Varieties" },
                { n: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                  className="rounded-2xl px-4 py-4 md:px-6 md:py-5 text-center"
                  style={{ background: "var(--blush)" }}
                >
                  <div
                    className="font-serif text-[32px] md:text-[44px] leading-none"
                    style={{ color: "var(--champagne)" }}
                  >
                    <Counter to={s.n} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </div>
                  <div
                    className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase mt-2"
                    style={{ color: "var(--dark-rose)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
