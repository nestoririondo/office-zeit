"use client"

import { useTransition, useState } from "react"
import { toggleDog, toggleLate, toggleBeer, toggleCake } from "../actions/presence"

type Props = {
  person: string
  color: string
  withDog?: boolean
  late?: boolean
  withBeer?: boolean
  withCake?: boolean
  dimmed?: boolean
  exiting?: boolean
  darkBackground?: boolean
  isOwn?: boolean
  date?: string
}

export default function PersonChip({
  person, color, withDog, late, withBeer, withCake,
  dimmed, exiting, darkBackground, isOwn, date
}: Props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [, startTransition] = useTransition()

  const animation = exiting
    ? "chip-out 0.2s ease-in forwards"
    : "chip-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both"

  function handleChipClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!isOwn || !date) return
    setPopupOpen((prev) => !prev)
  }

  function handle(e: React.MouseEvent, action: () => void) {
    e.preventDefault()
    e.stopPropagation()
    setPopupOpen(false)
    startTransition(action)
  }

  const activeEmojis = [
    withDog && "🐶",
    withBeer && "🍺",
    late && "⏰",
    withCake && "🎂",
  ].filter(Boolean)

  return (
    <>
    {popupOpen && (
      <span
        className="fixed inset-0 z-10"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPopupOpen(false) }}
      />
    )}
    <span
      data-chip
      onClick={handleChipClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: color,
        color: "#000",
        animation,
        boxShadow: darkBackground
          ? `${hovered && isOwn ? "4px 4px" : "2px 2px"} 0 rgba(255,255,255,${dimmed ? 0.3 : 0.65})`
          : `${hovered && isOwn ? "4px 4px" : "2px 2px"} 0 rgba(0,0,0,${dimmed ? 0.12 : 0.3})`,
        transition: "box-shadow 0.15s ease",
        transform: "rotate(-1.5deg)",
        cursor: isOwn ? "pointer" : "default",
      }}
      className={`relative inline-flex items-center justify-center font-mono text-xs font-bold min-w-20 min-h-20 p-2 text-center transition-opacity ${dimmed ? "opacity-60" : "opacity-100"} ${isOwn ? "hover:brightness-110" : ""} ${popupOpen ? "z-20" : ""}`}
      {...(popupOpen ? { "data-popup-open": true } : {})}
    >
      {popupOpen && isOwn ? (
        <span className="grid grid-cols-2 gap-2">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleDog(person, date!))}
            className={`text-xl leading-none transition-opacity border border-transparent hover:border-black/30 p-0.5 ${withDog ? "opacity-100" : "opacity-30"}`}
          >🐶</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleBeer(person, date!))}
            className={`text-xl leading-none transition-opacity border border-transparent hover:border-black/30 p-0.5 ${withBeer ? "opacity-100" : "opacity-30"}`}
          >🍺</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleLate(person, date!))}
            className={`text-xl leading-none transition-opacity border border-transparent hover:border-black/30 p-0.5 ${late ? "opacity-100" : "opacity-30"}`}
          >⏰</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleCake(person, date!))}
            className={`text-xl leading-none transition-opacity border border-transparent hover:border-black/30 p-0.5 ${withCake ? "opacity-100" : "opacity-30"}`}
          >🎂</span>
        </span>
      ) : (
        <span className="flex flex-col items-center leading-tight gap-0.5">
          <span>{person}</span>
          {activeEmojis.length > 0 && (
            <span className="flex gap-0.5 text-base leading-none">
              {activeEmojis.map((e) => (
                <span key={e as string} style={{ animation: "emoji-in 0.2s ease-out both" }}>{e}</span>
              ))}
            </span>
          )}
        </span>
      )}
    </span>
    </>
  )
}
