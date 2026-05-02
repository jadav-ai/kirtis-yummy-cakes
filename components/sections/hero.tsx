"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ParticlesBg } from "../particles-bg"
import { WhatsAppButton } from "../whatsapp-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const LINES: { text: string; className: string }[] = [
  { text: "EVERY", className: "text-[color:var(--ivory)]" },
  { text: "CAKE IS", className: "italic text-[color:var(--blush)]" },
  { text: "A MEMORY.", className: "font-bold text-[color:var(--champagne)]" },
]

function SplitLine({
  text,
  className,
  baseDelay,
}: {
  text: string
  className: string
  baseDelay: number
}) {
  // Word-level stagger (1–3 motion nodes per line) instead of char-level.
  // Same cinematic reveal, ~10x fewer DOM animations — easier on the GPU.
  const words = text.split(" ")
  return (
    <div
      className={`font-serif font-light leading-[0.88] text-[13vw] sm:text-[68px] md:text-[110px] lg:text-[148px] ${className}`}
      style={{ overflow: "hidden" }}
    >
      <span className="inline-flex flex-wrap gap-x-4">
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * 0.08,
              ease: [0.34, 1.2, 0.64, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        ))}
      </span>
    </div>
  )
}

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      className="relative w-full min-h-[100svh] overflow-hidden"
      style={{ backgroundColor: "var(--void)" }}
    >
      <div className="aurora-bg" />
      <ParticlesBg id="hero-particles" density="normal" variant="warm" />
      <div className="grain-overlay grain-dark absolute inset-0 pointer-events-none" />

      {/* Hero cake image (right side, diagonal clip) */}
      <div
        ref={imgRef}
        className="absolute top-0 right-0 h-full w-full md:w-[62%]"
        style={{
          clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
          WebkitClipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <Image
          src="/images/hero-cake.jpg"
          alt="A tall, elegant two-tier cream cake decorated with roses and gold leaf"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 62vw, 100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(26,10,14,0.85) 0%, rgba(26,10,14,0.5) 35%, rgba(26,10,14,0.1) 70%, rgba(26,10,14,0) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 min-h-[100svh] flex items-center pt-28 pb-24 md:pt-24">
        <div className="w-full md:max-w-[620px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-[10px] tracking-[0.45em] uppercase mb-6"
            style={{ color: "var(--champagne)" }}
          >
            Handcrafted with Love · VADODARA
          </motion.p>

          <SplitLine text={LINES[0].text} className={LINES[0].className} baseDelay={1.6} />
          <SplitLine text={LINES[1].text} className={LINES[1].className} baseDelay={1.8} />
          <SplitLine text={LINES[2].text} className={LINES[2].className} baseDelay={2.0} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-8 text-[14px] leading-[1.85] max-w-[380px]"
            style={{ color: "rgba(253,250,246,0.7)" }}
          >
            Where every sprinkle is placed with intention, every layer tells your story, and every
            bite becomes a moment you&apos;ll never forget.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <span
              className="bob inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] tracking-wide"
              style={{ background: "var(--blush)", color: "var(--void)" }}
            >
              ✨ 100% Homemade
            </span>
            <span
              className="bob-slower inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] tracking-wide"
              style={{ background: "var(--champagne)", color: "var(--void)" }}
            >
              🌿 100% Vegetarian
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.6 }}
            className="mt-10"
          >
            <WhatsAppButton
              variant="gold"
              magneticStrength={18}
              spring={{ stiffness: 120, damping: 12 }}
              className="px-10 py-4 text-[17px]"
            >
              ORDER ON WHATSAPP
            </WhatsAppButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div
          className="relative h-14 w-px overflow-hidden"
          style={{ background: "rgba(212,175,55,0.25)" }}
        >
          <span
            className="scroll-dot absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
            style={{ background: "var(--champagne)" }}
          />
        </div>
        <span
          className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(253,250,246,0.5)" }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
