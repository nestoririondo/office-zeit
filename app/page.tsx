import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import NamePicker from "./components/NamePicker"
import WeekView from "./components/WeekView"
import WeekTabs from "./components/WeekTabs"
import Polling from "./components/Polling"
import Header from "./components/Header"
import { prisma } from "../lib/prisma"
import { PERSON_COOKIE_NAME } from "../lib/constants"
import { verifyCookieValue } from "../lib/cookie-signing"
import { getDefaultWeekOffset } from "../lib/dates"

type Props = {
  searchParams: Promise<{ week?: string }>
}

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies()
  const raw = cookieStore.get(PERSON_COOKIE_NAME)?.value ?? ""
  const person = verifyCookieValue(raw)

  if (!person) {
    return <NamePicker />
  }

  const params = await searchParams
  const weekOffset = params.week !== undefined ? parseInt(params.week) : getDefaultWeekOffset()
  const isAutoSwitched = params.week === undefined && weekOffset === 1

  const personData = await prisma.person.findUnique({ where: { name: person } })

  if (!personData) {
    redirect("/api/logout")
  }

  const admins = process.env.ADMIN_MEMBERS?.split(",") ?? []
  const isAdmin = admins.includes(person)

  return (
    <main className="p-8 flex flex-col gap-8">
      <Header person={person} color={personData?.color ?? "#e5e7eb"} />
      <WeekTabs activeOffset={weekOffset} isAutoSwitched={isAutoSwitched} />
      <WeekView weekOffset={weekOffset} currentPerson={person} isAdmin={isAdmin} />
      <Polling />
    </main>
  )
}
