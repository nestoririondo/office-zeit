import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import NamePicker from "./components/NamePicker"
import WeekView from "./components/WeekView"
import WeekTabs from "./components/WeekTabs"
import Polling from "./components/Polling"
import Header from "./components/Header"
import { prisma } from "../lib/prisma"
import { PERSON_COOKIE_NAME } from "../lib/constants"

type Props = {
  searchParams: Promise<{ week?: string }>
}

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies()
  const person = cookieStore.get(PERSON_COOKIE_NAME)?.value

  if (!person) {
    return <NamePicker />
  }

  const params = await searchParams
  const weekOffset = params.week !== undefined ? parseInt(params.week) : 0

  const personData = await prisma.person.findUnique({ where: { name: person } })

  if (!personData) {
    redirect("/api/logout")
  }

  return (
    <main className="p-8 flex flex-col gap-8">
      <Header person={person} color={personData?.color ?? "#e5e7eb"} />
      <WeekTabs activeOffset={weekOffset} />
      <WeekView weekOffset={weekOffset} currentPerson={person} />
      <Polling />
    </main>
  )
}
