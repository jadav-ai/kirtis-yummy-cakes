"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ParticlesBg } from "../particles-bg"

function PinnedCount({
  to,
  suffix = "",
  decimals = 0,
  trigger,
}: {
  to: number
  suffix?: string
  decimals?: number
  trigger: boolean
}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, trigger])
  return (
    <span>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  const items = [
    { n: 500, suffix: "+", label: "Happy Customers" },
    { n: 8, suffix: "+", label: "Cake Varieties" },
    { n: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  ]

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--void)" }}
    >
      <div className="aurora-bg" />
      <ParticlesBg id="stats-particles" density="sparse" variant="gold" />
      <div className="grain-overlay grain-dark absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.4em] uppercase mb-12 md:mb-20"
          style={{ color: "var(--champagne)" }}
        >
          The Numbers Speak
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.9,
                delay: i * 0.15,
                ease: [0.76, 0, 0.24, 1],
              }}
              className={[
                "relative flex flex-col items-center px-6",
                i > 0 ? "md:border-l md:border-[rgba(212,175,55,0.25)]" : "",
              ].join(" ")}
            >
              <div
                className="font-serif text-[18vw] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-none"
                style={{ color: "var(--champagne)" }}
              >
                <PinnedCount
                  to={it.n}
                  suffix={it.suffix}
                  decimals={it.decimals ?? 0}
                  trigger={inView}
                />
              </div>
              <div
                className="mt-4 text-[12px] md:text-[13px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(253,250,246,0.6)" }}
              >
                {it.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
