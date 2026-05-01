"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, type MouseEvent, type ReactNode } from "react"

export const IG_LINK = "https://www.instagram.com/kirtis_yummy_cake_class/"

type Variant = "gold" | "outline" | "gradient"

type Props = {
  variant?: Variant
  magneticStrength?: number
  spring?: { stiffness: number; damping: number }
  children: ReactNode
  className?: string
  showIcon?: boolean
}

export function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

export function InstagramButton({
  variant = "outline",
  magneticStrength = 18,
  spring = { stiffness: 120, damping: 12 },
  children,
  className = "",
  showIcon = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, spring)
  const sy = useSpring(my, spring)

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const relX = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const relY = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    mx.set(relX * magneticStrength)
    my.set(relY * magneticStrength)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const variantClasses: Record<Variant, string> = {
    gold:
      "bg-[color:var(--champagne)] text-[color:var(--void)] hover:bg-[color:var(--gold-light)] shadow-[0_0_0_0_rgba(212,175,55,0)] hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]",
    outline:
      "border border-[color:var(--champagne)] text-[color:var(--ivory)] hover:bg-[color:var(--champagne)] hover:text-[color:var(--void)]",
    gradient:
      "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-[color:var(--ivory)] hover:brightness-110 shadow-[0_0_0_0_rgba(225,48,108,0)] hover:shadow-[0_0_48px_rgba(225,48,108,0.5)] pulse-glow",
  }

  return (
    <motion.a
      ref={ref}
      href={IG_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      data-cursor-label="INSTAGRAM"
      className={[
        "inline-flex items-center gap-3 font-serif italic transition-[background-color,box-shadow,color,transform] duration-500",
        "will-change-transform select-none rounded-[4px]",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {showIcon && <InstagramIcon size={18} />}
      <span className="tracking-wide">{children}</span>
    </motion.a>
  )
}
