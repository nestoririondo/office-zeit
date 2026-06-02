import type { WeekDay } from "../../lib/dates"
import { togglePresence } from "../actions/presence"
import PersonChip from "./PersonChip"

type Presence = {
  person: string
  withDog: boolean
}

type Props = {
  day: WeekDay
  presences: Presence[]
  currentPerson: string
  colorMap: Record<string, string>
}

export default function DayCard({ day, presences, currentPerson, colorMap }: Props) {
  const currentPresence = presences.find((p) => p.person === currentPerson)
  const isPresent = !!currentPresence

  return (
    <form action={togglePresence.bind(null, currentPerson, day.date)} className="flex-1">
      <button
        type="submit"
        className={`w-full h-full text-left bg-white dark:bg-black min-h-48 p-4 flex flex-col gap-2 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 border dark:border-white ${
          isPresent ? "border-2 border-black dark:border-white" : "border-black dark:border-white"
        }`}
      >
        <div className="font-mono font-bold text-lg">{day.label}</div>
        <div className="font-mono text-sm text-gray-500 dark:text-gray-400">{day.displayDate}</div>

        <div className="flex flex-wrap gap-1 mt-2 flex-1">
          {presences.map(({ person, withDog }) => (
            <PersonChip
              key={person}
              person={person}
              color={colorMap[person] ?? "#e5e7eb"}
              withDog={withDog}
              dimmed={person !== currentPerson}
            />
          ))}
        </div>

      </button>
    </form>
  )
}
