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
  holiday?: string
}

const cardBase = "w-full h-full text-left min-h-48 min-w-36 p-4 flex flex-col gap-2"

export default function DayCard({ day, presences, currentPerson, colorMap, holiday }: Props) {
  const isPresent = presences.some((p) => p.person === currentPerson)

  if (holiday) {
    return (
      <div className={`${cardBase} flex-1 bg-gray-300 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 cursor-not-allowed`}>
        <div className="font-mono font-bold text-lg text-gray-400 dark:text-gray-600">{day.label}</div>
        <div className="font-mono text-sm text-gray-400 dark:text-gray-600">{day.displayDate}</div>
        <div className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-1">{holiday}</div>
      </div>
    )
  }

  return (
    <form action={togglePresence.bind(null, currentPerson, day.date)} className="flex-1">
      <button
        type="submit"
        className={`${cardBase} cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-900 ${
          isPresent
            ? "border-2 border-black dark:border-white bg-white dark:bg-black"
            : "border border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
        }`}
      >
        <div className="font-mono font-bold text-lg">{day.label}</div>
        <div className="font-mono text-sm text-gray-500 dark:text-gray-400">{day.displayDate}</div>

        <div className="flex flex-wrap gap-2 mt-2 flex-1">
          <PresenceList presences={presences} currentPerson={currentPerson} colorMap={colorMap} />
        </div>
      </button>
    </form>
  )
}
