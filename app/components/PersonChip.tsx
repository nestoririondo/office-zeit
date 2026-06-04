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
  const [animKey, setAnimKey] = useState(0)
  const [, startTransition] = useTransition()

  const hasEmoji = withDog || late || withBeer || withCake
  const animation = exiting
    ? "chip-out 0.2s ease-in forwards"
    : hasEmoji
      ? "chip-dog-in 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) both"
      : "chip-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both"

  function handleChipClick(e: React.MouseEvent) {
    if (!isOwn || !date) return
    e.preventDefault()
    e.stopPropagation()
    setPopupOpen((prev) => !prev)
  }

  function handle(e: React.MouseEvent, action: () => void) {
    e.preventDefault()
    e.stopPropagation()
    setPopupOpen(false)
    setAnimKey((k) => k + 1)
    startTransition(action)
  }

  const activeEmojis = [
    withDog && "🐶",
    withBeer && "🍺",
    late && "⏰",
    withCake && "🎂",
  ].filter(Boolean)

  return (
    <span
      key={animKey}
      onClick={handleChipClick}
      style={{
        backgroundColor: color,
        color: "#000",
        animation,
        boxShadow: darkBackground
          ? `2px 2px 0 rgba(255,255,255,${dimmed ? 0.3 : 0.65})`
          : `2px 2px 0 rgba(0,0,0,${dimmed ? 0.12 : 0.3})`,
        transform: "rotate(-1.5deg)",
        cursor: isOwn ? "pointer" : "default",
      }}
      className={`relative inline-flex items-center justify-center font-mono text-xs font-bold min-w-20 min-h-20 p-2 text-center transition-opacity ${dimmed ? "opacity-60" : "opacity-100"}`}
    >
      {popupOpen && isOwn ? (
        <span className="grid grid-cols-2 gap-3">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleDog(person, date!))}
            className={`text-xl leading-none transition-opacity ${withDog ? "opacity-100" : "opacity-30"}`}
          >🐶</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleBeer(person, date!))}
            className={`text-xl leading-none transition-opacity ${withBeer ? "opacity-100" : "opacity-30"}`}
          >🍺</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleLate(person, date!))}
            className={`text-xl leading-none transition-opacity ${late ? "opacity-100" : "opacity-30"}`}
          >⏰</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => handle(e, () => toggleCake(person, date!))}
            className={`text-xl leading-none transition-opacity ${withCake ? "opacity-100" : "opacity-30"}`}
          >🎂</span>
        </span>
      ) : (
        <span className="flex flex-col items-center leading-tight gap-0.5">
          <span>{person}</span>
          {activeEmojis.length > 0 && (
            <span className="flex gap-0.5 text-base leading-none">
              {activeEmojis.map((e) => <span key={e as string}>{e}</span>)}
            </span>
          )}
        </span>
      )}
    </span>
  )
}
