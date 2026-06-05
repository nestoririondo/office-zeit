"use client"

import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  return (
    <button
      onClick={toggle}
      className="grid place-items-center w-4 h-4 p-0 text-sm leading-none overflow-hidden border border-current hover:scale-110 transition-transform cursor-pointer"
      aria-label="Toggle dark mode"
    >
      <span className="-translate-y-px">{dark ? "☀" : "☾"}</span>
    </button>
  )
}
