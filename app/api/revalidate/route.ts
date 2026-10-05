import "server-only"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

type WebhookPayload = { _type: string }

export async function POST(request: NextRequest) {
  const { isValidSignature, body } = await parseBody<WebhookPayload>(
    request,
    process.env.SANITY_REVALIDATE_SECRET,
  )

  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
  }
  if (!body?._type) {
    return NextResponse.json({ message: "Missing _type" }, { status: 400 })
  }

  // expire: 0 forces immediate invalidation — the webhook is a third-party
  // caller that expects the change to be live right away, not on next visit
  // (which is what the recommended `profile: "max"` would give us).
  revalidateTag(body._type, { expire: 0 })
  return NextResponse.json({ revalidated: true, tag: body._type })
}
