"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Blush-gold morphing custom cursor.
 * - Outer ring: 44px blush border, springs with ~0.14s lag (CSS + RAF easing)
 * - Inner dot: 5px champagne gold, instant follow
 * - On hoverable elements: ring grows to 72px, fills blush@12%, dot disappears
 *   and shows an optional label ("VIEW", "EXPLORE", "ORDER")
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const frame = useRef<number>(0)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState("VIEW")

  useEffect(() => {
    // Only enable on real mouse pointer devices
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (!canHover) return
    setEnabled(true)

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const tick = () => {
      // spring-lag for the ring (~0.14s feel via 0.16 lerp)
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.16
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)

    // Hover detection via delegation; we look for [data-cursor] or common interactive elements
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

    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)

    return () => {
      cancelAnimationFrame(frame.current)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.body.classList.remove("cursor-hover")
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className="cursor-ring" data-label={label} aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
