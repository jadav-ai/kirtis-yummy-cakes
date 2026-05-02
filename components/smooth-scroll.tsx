"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)

    if (prefersReduced || isTouch) return

    const lenis = new Lenis({
      lerp: 0.075,
      duration: 1.6,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    })

    // Wire Lenis into GSAP's ticker so ScrollTrigger stays in sync.
    function raf(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    lenis.on("scroll", ScrollTrigger.update)

    // Anchor navigation support
    const handleAnchor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || href === "#") return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -40, duration: 1.6 })
    }
    document.addEventListener("click", handleAnchor)

    return () => {
      document.removeEventListener("click", handleAnchor)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
