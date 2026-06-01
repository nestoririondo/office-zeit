import { cookies } from "next/headers"
import Link from "next/link"
import NamePicker from "./components/NamePicker"
import WeekView from "./components/WeekView"
import WeekTabs from "./components/WeekTabs"
import Polling from "./components/Polling"
import { getDefaultWeekOffset } from "../lib/dates"
import { prisma } from "../lib/prisma"

type Props = {
  searchParams: Promise<{ week?: string }>
}

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies()
  const person = cookieStore.get("officeZeitPerson")?.value

  if (!person) {
    return <NamePicker />
  }

  const params = await searchParams
  const weekOffset = params.week !== undefined
    ? parseInt(params.week)
    : getDefaultWeekOffset()

  const personData = await prisma.person.findUnique({ where: { name: person } })

  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-bold text-2xl">Wann bist du im Office?</h1>
        <Link href="/color" className="flex items-center gap-2 group">
          <div
            className="w-4 h-4 border border-black dark:border-white group-hover:scale-110 transition-transform"
            style={{ backgroundColor: personData?.color ?? "#e5e7eb" }}
          />
          <span className="font-mono text-sm text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            {person}
          </span>
        </Link>
      </div>
      <Polling />
      <WeekTabs activeOffset={weekOffset} />
      <WeekView weekOffset={weekOffset} currentPerson={person} />
    </main>
  )
}
