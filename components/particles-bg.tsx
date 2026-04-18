"use client"

import { useMemo } from "react"
import { useLowPerf } from "@/hooks/use-low-perf"

type Props = {
  id: string
  density?: "sparse" | "normal" | "dense"
  variant?: "warm" | "gold"
}

/**
 * Lightweight CSS-only decorative "particles". Renders a handful of absolutely
 * positioned, GPU-composited divs with pure CSS translate animations — no
 * canvas, no RAF, no runtime physics, no heavy library. Cheap on Iris Xe.
 * Skipped entirely on low-perf / touch / reduced-motion devices.
 */
export function ParticlesBg({ id, density = "normal", variant = "warm" }: Props) {
  const low = useLowPerf()

  const count = density === "sparse" ? 5 : density === "dense" ? 10 : 7

  // Pre-compute deterministic positions so SSR/CSR match.
  const dots = useMemo(() => {
    const seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
    const rand = (n: number) => {
      const x = Math.sin(seed + n * 9.13) * 10000
      return x - Math.floor(x)
    }
    return Array.from({ length: count }).map((_, i) => ({
      key: i,
      left: `${Math.round(rand(i) * 100)}%`,
      top: `${Math.round(rand(i + 1) * 100)}%`,
      size: 3 + Math.round(rand(i + 2) * 4), // 3-7px
      delay: `${(rand(i + 3) * 6).toFixed(2)}s`,
      duration: `${(10 + rand(i + 4) * 8).toFixed(2)}s`,
      drift: (rand(i + 5) - 0.5) * 40, // -20..20px
    }))
  }, [count, id])

  if (low) return null

  const color =
    variant === "gold"
      ? "var(--champagne)"
      : "var(--blush)"

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      {dots.map((d) => (
        <span
          key={d.key}
          className="absolute block rounded-full particle-float"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: color,
            opacity: 0.45,
            animationDelay: d.delay,
            animationDuration: d.duration,
            // CSS custom property consumed by keyframes to vary drift per dot.
            ["--drift" as string]: `${d.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
