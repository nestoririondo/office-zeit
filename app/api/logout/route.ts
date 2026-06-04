import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PERSON_COOKIE_NAME } from "../../../lib/constants"

export async function GET() {
  const cookieStore = await cookies()
  cookieStore.delete(PERSON_COOKIE_NAME)
  redirect("/")
}
