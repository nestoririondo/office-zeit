import { createHmac, timingSafeEqual } from "crypto"

export function signCookieValue(value: string): string {
  const secret = process.env.COOKIE_SECRET!
  const sig = createHmac("sha256", secret).update(value).digest("hex")
  return `${value}.${sig}`
}

export function verifyCookieValue(signed: string): string | null {
  const secret = process.env.COOKIE_SECRET
  if (!secret) return null
  const lastDot = signed.lastIndexOf(".")
  if (lastDot === -1) return null
  const value = signed.slice(0, lastDot)
  const sig = signed.slice(lastDot + 1)
  const expected = createHmac("sha256", secret).update(value).digest("hex")
  try {
    const a = Buffer.from(sig, "hex")
    const b = Buffer.from(expected, "hex")
    if (a.length !== b.length) return null
    return timingSafeEqual(a, b) ? value : null
  } catch {
    return null
  }
}
