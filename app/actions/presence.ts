"use server"

import { cookies } from "next/headers"
import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"
import { PERSON_COOKIE_NAME } from "../../lib/constants"
import { verifyCookieValue } from "../../lib/cookie-signing"

export async function removePresence(person: string, date: string) {
  const cookieStore = await cookies()
  const raw = cookieStore.get(PERSON_COOKIE_NAME)?.value ?? ""
  const currentPerson = verifyCookieValue(raw)
  const admins = process.env.ADMIN_MEMBERS?.split(",") ?? []
  if (!currentPerson || !admins.includes(currentPerson)) return

  await prisma.presence.deleteMany({ where: { person, date } })
  revalidatePath("/")
}

export async function togglePresence(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })

  if (existing) {
    await prisma.presence.delete({ where: { id: existing.id } })
  } else {
    await prisma.presence.create({ data: { person, date } })
  }

  revalidatePath("/")
}

export async function toggleDog(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })

  if (!existing) return

  await prisma.presence.update({
    where: { id: existing.id },
    data: { withDog: !existing.withDog },
  })

  revalidatePath("/")
}

export async function toggleLate(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })
  if (!existing) return
  await prisma.presence.update({
    where: { id: existing.id },
    data: { late: !existing.late },
  })
  revalidatePath("/")
}

export async function toggleBeer(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })
  if (!existing) return
  await prisma.presence.update({
    where: { id: existing.id },
    data: { withBeer: !existing.withBeer },
  })
  revalidatePath("/")
}

export async function toggleCake(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })
  if (!existing) return
  await prisma.presence.update({
    where: { id: existing.id },
    data: { withCake: !existing.withCake },
  })
  revalidatePath("/")
}
