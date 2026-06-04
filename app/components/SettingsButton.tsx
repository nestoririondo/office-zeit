"use client"

import { useState } from "react"
import SettingsModal from "./SettingsModal"
import IdentityForm from "./IdentityForm"

type Props = {
  person: string
  color: string
}

export default function SettingsButton({ person, color }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div
          className="w-4 h-4 border border-black dark:border-white group-hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
        />
        <span className="font-mono text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
          {person}
        </span>
      </button>

      {open && (
        <SettingsModal onClose={() => setOpen(false)}>
          <IdentityForm person={person} currentColor={color} onClose={() => setOpen(false)} />
        </SettingsModal>
      )}
    </>
  )
}
