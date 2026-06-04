"use client"

import { useState, useEffect } from "react"
import PersonChip from "./PersonChip"

type Presence = { person: string; withDog: boolean }

type Props = {
  presences: Presence[]
  currentPerson: string
  colorMap: Record<string, string>
}

export default function PresenceList({ presences, currentPerson, colorMap }: Props) {
  const [chips, setChips] = useState<(Presence & { exiting?: boolean })[]>(presences)

  useEffect(() => {
    const incoming = new Set(presences.map((p) => p.person))
    const toExit = chips.filter((c) => !c.exiting && !incoming.has(c.person))

    if (toExit.length === 0) {
      setChips(presences)
      return
    }

    setChips((prev) =>
      prev.map((c) => (toExit.some((e) => e.person === c.person) ? { ...c, exiting: true } : c))
    )

    const timer = setTimeout(() => setChips(presences), 220)
    return () => clearTimeout(timer)
  }, [presences])

  return (
    <>
      {chips.map(({ person, withDog, exiting }) => (
        <PersonChip
          key={person}
          person={person}
          color={colorMap[person] ?? "#e5e7eb"}
          withDog={withDog}
          dimmed={person !== currentPerson}
          exiting={exiting}
        />
      ))}
    </>
  )
}
