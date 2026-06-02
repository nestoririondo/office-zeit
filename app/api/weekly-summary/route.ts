import { NextResponse } from "next/server"
import { prisma } from "../../../lib/prisma"
import { getWeekDays } from "../../../lib/dates"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!process.env.API_SECRET_TOKEN || token !== process.env.API_SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const lastWeekDays = getWeekDays(-1)
  const thisWeekDays = getWeekDays(0)

  const allDates = [...lastWeekDays, ...thisWeekDays].map((d) => d.date)

  const presences = await prisma.presence.findMany({
    where: { date: { in: allDates } },
    orderBy: { date: "asc" },
  })

  function groupByPerson(days: typeof lastWeekDays) {
    const dates = new Set(days.map((d) => d.date))
    const map = new Map<string, string[]>()

    for (const p of presences) {
      if (!dates.has(p.date)) continue
      const label = days.find((d) => d.date === p.date)!.label
      if (!map.has(p.person)) map.set(p.person, [])
      map.get(p.person)!.push(label)
    }

    return Array.from(map.entries()).map(([person, days]) => ({ person, days }))
  }

  return NextResponse.json({
    lastWeek: {
      from: lastWeekDays[0].date,
      to: lastWeekDays[4].date,
      presences: groupByPerson(lastWeekDays),
    },
    thisWeek: {
      from: thisWeekDays[0].date,
      to: thisWeekDays[4].date,
      presences: groupByPerson(thisWeekDays),
    },
  })
}
