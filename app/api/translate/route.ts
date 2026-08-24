import "server-only"
import { NextResponse } from "next/server"
import { safe, safeMarkdown } from "@/lib/translate"
import { NON_BASE_LANGUAGES } from "@/sanity/lib/locales"
import { isMarkdownField } from "@/sanity/lib/translatableFields"

// Lightweight guard: this route has no auth of its own (unlike Sanity Studio
// writes, which are gated by Sanity's hosted login). It's only meant to be
// called by the Studio "Translate" document action, same-origin. This isn't
// identity verification — just enough to stop it being used as a casual open
// translation relay. Wire real Sanity session validation here if stronger
// guarantees are ever needed.
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60_000
const requestLog = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const entry = requestLog.get(key)
  if (!entry || now > entry.resetAt) {
    requestLog.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true // no Origin header (e.g. same-origin non-CORS request) — allow, rate limit covers abuse
  return origin === new URL(request.url).origin
}

type TranslateRequestBody = {
  fields: Record<string, string | string[]>
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  const body = (await request.json()) as TranslateRequestBody
  const fields = body?.fields ?? {}

  const result: Record<string, Record<string, string | string[]>> = {}

  await Promise.all(
    Object.entries(fields).map(async ([key, value]) => {
      result[key] = {}
      const translateString = isMarkdownField(key) ? safeMarkdown : safe
      await Promise.all(
        NON_BASE_LANGUAGES.map(async (lang) => {
          if (Array.isArray(value)) {
            result[key][lang.id] = await Promise.all(
              value.map(async (v) => (await translateString(v, lang.id)) ?? v),
            )
          } else {
            result[key][lang.id] = (await translateString(value, lang.id)) ?? value
          }
        }),
      )
    }),
  )

  return NextResponse.json(result)
}
