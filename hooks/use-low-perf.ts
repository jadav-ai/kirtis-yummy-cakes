"use client"

import { useEffect, useState } from "react"

/**
 * Detects modest-performance environments (integrated graphics, low-to-mid
 * laptops, touch devices, reduced-motion preference) so we can down-shift
 * the most expensive visual effects (canvas particles, 3D tilt springs,
 * custom RAF cursor).
 *
 * Thresholds chosen to INCLUDE typical i5 + Iris Xe (8 logical cores, 8 GB
 * RAM) — they need relief too. High-end desktops (>= 12 threads OR >= 16 GB
 * RAM) will opt back in to the full experience.
 *
 * Note: the universal perf wins (reduced blurs, removed hue-rotate filter,
 * CSS-only particles) apply to EVERYONE, not just low-perf. This hook only
 * gates the optional heavy effects.
 */
export function useLowPerf(): boolean {
  // Default to `true` during SSR so we don't ship expensive effects on
  // first paint. It flips to the real value in useEffect.
  const [low, setLow] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarse = window.matchMedia("(pointer: coarse)").matches

    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 8
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8

    // Consider "high-perf" only if the machine has clear headroom.
    const isHighPerf = cores >= 12 && mem >= 8 && !coarse && !prefersReducedMotion

    setLow(!isHighPerf)
  }, [])

  return low
}
