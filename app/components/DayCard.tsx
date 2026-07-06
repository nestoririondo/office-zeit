import type { WeekDay } from "../../lib/dates";
import { togglePresence } from "../actions/presence";
import PresenceList from "./PresenceList";

type Presence = {
  person: string;
  withDog: boolean;
  late: boolean;
  withBeer: boolean;
  withCake: boolean;
};

type Props = {
  day: WeekDay;
  presences: Presence[];
  currentPerson: string;
  colorMap: Record<string, string>;
  holiday?: string;
  isAdmin: boolean;
};

const cardBase =
  "w-full h-full text-left min-h-64 min-w-36 p-5 flex flex-col gap-2";

export default function DayCard({
  day,
  presences,
  currentPerson,
  colorMap,
  holiday,
  isAdmin,
}: Props) {
  const isPresent = presences.some((p) => p.person === currentPerson);

  if (holiday) {
    return (
      <div
        className={`${cardBase} flex-1 bg-gray-300 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 cursor-not-allowed`}
      >
        <div className="font-mono font-black text-5xl leading-none text-gray-400 dark:text-gray-600">
          {day.label}
        </div>
        <div className="font-mono text-xs text-gray-400 dark:text-gray-600">
          {day.displayDate}
        </div>
        <div className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-1">
          {holiday}
        </div>
      </div>
    );
  }

  return (
    <form
      action={togglePresence.bind(null, currentPerson, day.date)}
      className="flex-1"
    >
      <button
        type="submit"
        className={`${cardBase} relative overflow-hidden cursor-pointer group ${
          isPresent
            ? "border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
            : "border border-gray-300 dark:border-gray-700 bg-white dark:bg-black"
        }`}
      >
        {currentPerson && (
          <>
            <span
              className={`absolute inset-0 opacity-0 group-[&:hover:not(:has([data-chip]:hover)):not(:has([data-popup-open]))]:opacity-100 transition-opacity duration-150 pointer-events-none ${isPresent ? "bg-black/10 dark:bg-white/10" : "bg-black/5 dark:bg-white/5"}`}
            />
            <span
              className={`absolute top-5 right-5 font-mono font-black text-2xl leading-none opacity-0 group-[&:hover:not(:has([data-chip]:hover)):not(:has([data-popup-open]))]:opacity-100 transition-opacity duration-150 pointer-events-none ${isPresent ? "text-white/60 dark:text-black/60" : "text-black/30 dark:text-white/30"}`}
            >
              {isPresent ? "−" : "+"}
            </span>
          </>
        )}
        <div className="font-mono font-black text-5xl leading-none">
          {day.label}
        </div>
        <div
          className={`font-mono text-xs ${isPresent ? "text-gray-400 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"}`}
        >
          {day.displayDate}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          <PresenceList
            presences={presences}
            currentPerson={currentPerson}
            colorMap={colorMap}
            darkBackground={isPresent}
            date={day.date}
            isAdmin={isAdmin}
          />
        </div>
      </button>
    </form>
  );
}
