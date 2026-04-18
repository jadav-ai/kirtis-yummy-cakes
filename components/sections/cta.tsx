"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ParticlesBg } from "../particles-bg"
import { WhatsAppButton } from "../whatsapp-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center"
    >
      <div ref={imgRef} className="absolute inset-0 scale-110">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,10,14,0.82) 0%, rgba(45,16,24,0.7) 50%, rgba(212,175,55,0.18) 100%)",
        }}
      />
      <ParticlesBg id="cta-particles" density="dense" variant="warm" />
      <div className="grain-overlay grain-dark absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.5em] uppercase mb-6"
          style={{ color: "var(--champagne)" }}
        >
          Ready to Create Something Beautiful?
        </motion.p>

        <h2
          className="font-serif text-[48px] md:text-[76px] lg:text-[100px] leading-[0.95] text-balance"
          style={{ color: "var(--ivory)" }}
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block"
          >
            Your Dream Cake
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block italic"
            style={{ color: "var(--blush)" }}
          >
            Starts With
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="inline-block font-bold"
            style={{ color: "var(--champagne)" }}
          >
            One Message.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 max-w-[420px] mx-auto text-[15px] leading-[1.8]"
          style={{ color: "rgba(253,250,246,0.7)" }}
        >
          Tell Kirti your idea and she&apos;ll bring it to life — one delicious layer at a time.
          Direct, personal, and made just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-12 inline-block"
        >
          <WhatsAppButton
            variant="green"
            showIcon
            magneticStrength={22}
            spring={{ stiffness: 100, damping: 10 }}
            className="px-10 md:px-13 py-5 text-[18px] md:text-[19px]"
          >
            ORDER ON WHATSAPP
          </WhatsAppButton>
        </motion.div>
      </div>
    </section>
  )
}
