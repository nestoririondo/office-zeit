"use client"

import { useState } from "react"
import { updateProfile, clearIdentity } from "../actions/identity"
import { COLORS, MAX_NAME_LENGTH } from "../../lib/constants"

type Props = {
  person: string
  currentColor: string
  onClose: () => void
}

export default function SettingsForm({ person, currentColor, onClose }: Props) {
  const [selectedColor, setSelectedColor] = useState(currentColor)
  const [name, setName] = useState(person)
  const [saveError, setSaveError] = useState("")

  async function handleSave(formData: FormData) {
    const result = await updateProfile(formData)
    if (result?.error) setSaveError(result.error)
  }

  return (
    <div className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white p-8 w-full max-w-sm flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-bold text-2xl">Einstellungen</h1>
        <button
          onClick={onClose}
          className="font-mono text-2xl leading-none hover:opacity-50 transition-opacity cursor-pointer"
        >
          ×
        </button>
      </div>

      <form action={handleSave} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="newName"
            required
            placeholder="Dein Name"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaveError("") }}
            maxLength={MAX_NAME_LENGTH}
            className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
          />
          <p className="font-mono text-xs text-gray-400 dark:text-gray-500">
            Eingeloggt als {person}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              style={{ backgroundColor: color }}
              className={`w-8 h-8 transition-transform cursor-pointer ${
                selectedColor === color ? "shadow-[inset_0_0_0_3px_black] scale-110" : ""
              }`}
            />
          ))}
        </div>

        <div
          className="font-mono text-xs px-3 py-1 self-start font-bold text-black"
          style={{ backgroundColor: selectedColor }}
        >
          {name || "Vorschau"}
        </div>

        <input type="hidden" name="color" value={selectedColor} />

        {saveError && (
          <p className="font-mono text-xs text-red-400">{saveError}</p>
        )}

        <button
          type="submit"
          className="border border-black dark:border-white font-mono px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
        >
          Speichern →
        </button>
      </form>

      <form action={clearIdentity} className="-mt-4">
        <button
          type="submit"
          className="w-full border border-red-400 text-red-400 font-mono px-4 py-2 hover:bg-red-400 hover:text-white transition-colors cursor-pointer"
        >
          Abmelden
        </button>
      </form>
    </div>
  )
}
