"use client"

import { useEffect, useState } from "react"

const words = ["smart", "fast", "easy"]

export function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block min-w-[5ch] text-primary">
      <span className="opacity-0" aria-hidden>
        {words[index]}
      </span>
      <span
        className="absolute inset-0 animate-in fade-in slide-in-from-bottom-2 duration-500"
        key={index}
      >
        {words[index]}
      </span>
    </span>
  )
}
