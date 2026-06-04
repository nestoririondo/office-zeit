"use client"

import { useState } from "react"
import { setIdentity, updateProfile, clearIdentity } from "../actions/identity"
import { MAX_NAME_LENGTH } from "../../lib/constants"

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
  onClose?: () => void
}

export default function IdentityForm({ person, currentColor, onClose }: Props) {
  const [selectedColor, setSelectedColor] = useState(currentColor ?? COLORS[0])
  const [name, setName] = useState(person ?? "")
  const [saveError, setSaveError] = useState("")

  const isExisting = !!person
  const previewName = name || "Vorschau"

  async function handleSave(formData: FormData) {
    const result = await updateProfile(formData)
    if (result?.error) setSaveError(result.error)
  }

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white p-8 w-full max-w-sm flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-bold text-2xl">
          {isExisting ? "Einstellungen" : "Wer bist du?"}
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="font-mono text-2xl leading-none hover:opacity-50 transition-opacity cursor-pointer"
          >
            ×
          </button>
        )}
      </div>

      <form action={isExisting ? handleSave : setIdentity} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name={isExisting ? "newName" : "person"}
            required
            placeholder="Dein Name"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaveError("") }}
            maxLength={MAX_NAME_LENGTH}
            className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
          />
          {isExisting && (
            <p className="font-mono text-xs text-gray-400 dark:text-gray-500">
              Eingeloggt als {person}
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 transition-transform cursor-pointer ${
                selectedColor === color
                  ? "shadow-[inset_0_0_0_3px_black] scale-110"
                  : ""
              }`}
            />
          ))}
        </div>

        <div
          className="font-mono text-xs px-3 py-1 self-start font-bold text-black"
          style={{ backgroundColor: selectedColor }}
        >
          {previewName}
        </div>

        <input type="hidden" name="color" value={selectedColor} />

        {saveError && (
          <p className="font-mono text-xs text-red-400">{saveError}</p>
        )}

        <button
          type="submit"
          className="border border-black dark:border-white font-mono px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
        >
          {isExisting ? "Speichern →" : "Weiter →"}
        </button>
      </form>

      {isExisting && (
        <form action={clearIdentity} className="-mt-4">
          <button
            type="submit"
            className="w-full border border-red-400 text-red-400 font-mono px-4 py-2 hover:bg-red-400 hover:text-white transition-colors cursor-pointer"
          >
            Abmelden
          </button>
        </form>
      )}
    </div>
  )
}
