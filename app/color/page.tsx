import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import ColorPicker from "../components/ColorPicker"

export default async function ColorPage() {
  const cookieStore = await cookies()
  const person = cookieStore.get("officeZeitPerson")?.value

  if (!person) redirect("/")

  const personData = await prisma.person.findUnique({ where: { name: person } })

  if (!personData) redirect("/")

  return <ColorPicker person={person} currentColor={personData.color} />
}
