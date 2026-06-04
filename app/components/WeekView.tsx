import { getWeekDays } from "../../lib/dates"
import { prisma } from "../../lib/prisma"
import { getHolidays } from "../../lib/holidays"
import DayCard from "./DayCard"

type Props = {
  weekOffset: number
  currentPerson: string
}

export default async function WeekView({ weekOffset, currentPerson }: Props) {
  const days = getWeekDays(weekOffset)
  const dates = days.map((d) => d.date)
  const year = new Date(dates[0]).getFullYear()
  const holidays = getHolidays(year)

  const [presences, persons] = await Promise.all([
    prisma.presence.findMany({ where: { date: { in: dates } } }),
    prisma.person.findMany(),
  ])

  const colorMap = Object.fromEntries(persons.map((p) => [p.name, p.color]))

  return (
    <div className="flex flex-col sm:flex-row gap-px bg-black dark:bg-white border border-black dark:border-white overflow-x-auto">
      {days.map((day) => {
        const dayPresences = presences
          .filter((p) => p.date === day.date)
          .map((p) => ({ person: p.person, withDog: p.withDog, late: p.late, withBeer: p.withBeer, withCake: p.withCake }))

        return (
          <DayCard
            key={day.date}
            day={day}
            presences={dayPresences}
            currentPerson={currentPerson}
            colorMap={colorMap}
            holiday={holidays.get(day.date)}
          />
        )
      })}
    </div>
  )
}
