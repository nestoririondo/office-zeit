"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import { PERSON_COOKIE_NAME, MAX_NAME_LENGTH } from "../../lib/constants"
import { signCookieValue } from "../../lib/cookie-signing"

export async function setIdentity(formData: FormData) {
  const person = (formData.get("person") as string)?.trim()
  const color = formData.get("color") as string
  if (!person || !color || person.length > MAX_NAME_LENGTH) return

  await prisma.person.upsert({
    where: { name: person },
    update: { color },
    create: { name: person, color },
  })

  const cookieStore = await cookies()
  cookieStore.set(PERSON_COOKIE_NAME, signCookieValue(person), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect("/")
}

async function applyRename(
  oldName: string,
  newName: string,
  color: string,
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Promise<{ error: string } | null> {
  const existing = await prisma.person.findUnique({ where: { name: newName } })
  if (existing) return { error: "Name bereits vergeben" }

  await prisma.$transaction([
    prisma.presence.updateMany({ where: { person: oldName }, data: { person: newName } }),
    prisma.person.update({ where: { name: oldName }, data: { name: newName, color } }),
  ])

  cookieStore.set(PERSON_COOKIE_NAME, newName, { httpOnly: true, maxAge: 60 * 60 * 24 * 365 })
  return null
}

export async function updateProfile(formData: FormData): Promise<{ error: string } | void> {
  const newName = (formData.get("newName") as string)?.trim()
  const color = formData.get("color") as string
  const cookieStore = await cookies()
  const oldName = cookieStore.get(PERSON_COOKIE_NAME)?.value
  if (!oldName || !newName || !color || newName.length > MAX_NAME_LENGTH) return

  if (newName !== oldName) {
    const renameError = await applyRename(oldName, newName, color, cookieStore)
    if (renameError) return renameError
  } else {
    await prisma.person.update({ where: { name: oldName }, data: { color } })
  }

  redirect("/")
}

export async function clearIdentity() {
  const cookieStore = await cookies()
  cookieStore.delete(PERSON_COOKIE_NAME)
  redirect("/")
}
