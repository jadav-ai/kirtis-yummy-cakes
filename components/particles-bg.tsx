"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

type Props = {
  id: string
  density?: "sparse" | "normal" | "dense"
  variant?: "warm" | "gold"
}

export function ParticlesBg({ id, density = "normal", variant = "warm" }: Props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const count = density === "sparse" ? 18 : density === "dense" ? 48 : 30

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    particles: {
      number: { value: count },
      color: {
        value:
          variant === "gold"
            ? ["#D4AF37", "#EDD97A", "#FDFAF6"]
            : ["#F4A7B9", "#D4AF37", "#FDFAF6"],
      },
      shape: {
        type: ["circle", "char"],
        options: {
          char: [
            {
              value: ["♥", "✦", "•"],
              font: "serif",
              weight: "400",
              fill: true,
            },
          ],
        },
      },
      opacity: {
        value: { min: 0.35, max: 0.7 },
        animation: { enable: true, speed: 0.4, sync: false },
      },
      size: {
        value: { min: 3, max: 6 },
      },
      move: {
        enable: true,
        direction: "top",
        speed: 0.35,
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      wobble: {
        enable: true,
        distance: 8,
        speed: { min: -2, max: 2 },
      },
    },
    interactivity: {
      events: {},
    },
    background: { color: "transparent" },
  }

  if (!ready) return null
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]">
      <Particles id={id} options={options} />
    </div>
  )
}
