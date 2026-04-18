"use client"

import { useEffect, useRef, useState } from "react"
import { useLowPerf } from "@/hooks/use-low-perf"

/**
 * Blush-gold morphing custom cursor. Only runs on desktops that report
 * enough headroom (via useLowPerf). On low-perf machines / touch devices
 * the native cursor stays visible and no RAF loop runs — saving ~1–2%
 * continuous CPU.
 */
export function CustomCursor() {
  const low = useLowPerf()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const frame = useRef<number>(0)
  const [label, setLabel] = useState("VIEW")

  useEffect(() => {
    if (low) return
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return

    document.documentElement.classList.add("kyc-cursor-on")

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const hoverable = target.closest(
        'a, button, [role="button"], [data-cursor]',
      ) as HTMLElement | null

      if (hoverable) {
        document.body.classList.add("cursor-hover")
        const lbl =
          hoverable.getAttribute("data-cursor-label") ||
          (hoverable.tagName === "A" && hoverable.getAttribute("href")?.startsWith("https://wa.me")
            ? "ORDER"
            : "VIEW")
        setLabel(lbl)
      } else {
        document.body.classList.remove("cursor-hover")
      }
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })

    return () => {
      cancelAnimationFrame(frame.current)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.documentElement.classList.remove("kyc-cursor-on")
      document.body.classList.remove("cursor-hover")
    }
  }, [low])

  if (low) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-label={label} aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
