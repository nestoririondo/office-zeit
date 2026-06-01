"use client"

import { useState } from "react"
import { setIdentity, updateColor } from "../actions/identity"

export const COLORS = [
  "#FFB3BA",
  "#FF9AA2",
  "#FFDAC1",
  "#FFD580",
  "#FDFD96",
  "#C7F2A4",
  "#B5EAD7",
  "#A8E6E2",
  "#C7CEEA",
  "#B5C8F0",
  "#E2C4F0",
  "#F2D7EE",
  "#D4A5A5",
  "#F0E6C8",
  "#C8E6C9",
  "#B2EBF2",
]

type Props = {
  person?: string
  currentColor?: string
}

export default function IdentityForm({ person, currentColor }: Props) {
  const [selectedColor, setSelectedColor] = useState(currentColor ?? COLORS[0])
  const [name, setName] = useState("")

  const isExisting = !!person
  const previewName = isExisting ? person : name || "Vorschau"

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <div className="border-2 border-black dark:border-white p-8 w-full max-w-sm flex flex-col gap-6">
        <h1 className="font-mono font-bold text-2xl">
          {isExisting ? "Farbe ändern" : "Wer bist du?"}
        </h1>

        <form action={isExisting ? updateColor : setIdentity} className="flex flex-col gap-5">
          {isExisting ? (
            <div>
              <p className="font-mono text-sm text-gray-500 dark:text-gray-400">Eingeloggt als</p>
              <p className="font-mono font-bold text-lg">{person}</p>
            </div>
          ) : (
            <input
              type="text"
              name="person"
              required
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
            />
          )}

          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm">Deine Farbe</span>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 border-2 transition-transform cursor-pointer ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className="font-mono text-xs px-3 py-1 self-start font-bold text-black"
            style={{ backgroundColor: selectedColor }}
          >
            {previewName}
          </div>

          <input type="hidden" name="color" value={selectedColor} />

          <button
            type="submit"
            className="border border-black dark:border-white font-mono px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
          >
            {isExisting ? "Speichern →" : "Weiter →"}
          </button>
        </form>
      </div>
    </div>
  )
}
