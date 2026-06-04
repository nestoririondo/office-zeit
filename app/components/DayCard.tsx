import type { WeekDay } from "../../lib/dates"
import { togglePresence } from "../actions/presence"
import PresenceList from "./PresenceList"

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
  const isPresent = presences.some((p) => p.person === currentPerson)

  return (
    <form action={togglePresence.bind(null, currentPerson, day.date)} className="flex-1">
      <button
        type="submit"
        className={`w-full h-full text-left bg-white dark:bg-black min-h-48 p-4 flex flex-col gap-2 cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-900 ${
          isPresent
            ? "border-2 border-black dark:border-white"
            : "border border-gray-300 dark:border-gray-700"
        }`}
      >
        <div className="font-mono font-bold text-lg">{day.label}</div>
        <div className="font-mono text-sm text-gray-500 dark:text-gray-400">{day.displayDate}</div>

        <div className="flex flex-wrap gap-1 mt-2 flex-1">
          <PresenceList presences={presences} currentPerson={currentPerson} colorMap={colorMap} />
        </div>
      </button>
    </form>
  )
}
