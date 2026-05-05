// Seed script: migrates static data from lib/data.ts into Sanity.
// Run with: npx tsx scripts/seed-sanity.ts
//
// NOTE: Image fields are intentionally omitted. After seeding, upload images
// manually via the Sanity Studio at /studio.
//
// Requires env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
// SANITY_API_TOKEN (write token)

import { loadEnvConfig } from "@next/env"
import { createClient } from "next-sanity"
import {
  newsItems,
  events,
  teamMembers,
  resources,
  libraryItems,
  sisterOrgs,
  membershipTiers,
} from "../lib/data"

// Load .env.local — must run before createClient reads process.env
loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function seed() {
  console.log("Seeding newsItems…")
  for (const item of newsItems) {
    const doc = await client.create({
      _type: "newsItem",
      slug: { _type: "slug", current: item.slug },
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      ...(item.author ? { author: item.author } : {}),
    })
    console.log(`  created newsItem: ${doc._id} (${item.slug})`)
  }

  console.log("Seeding events…")
  for (const event of events) {
    const doc = await client.create({
      _type: "event",
      slug: { _type: "slug", current: event.slug },
      title: event.title,
      description: event.description,
      type: event.type,
      date: event.date,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      location: event.location,
      ...(event.registrationUrl ? { registrationUrl: event.registrationUrl } : {}),
    })
    console.log(`  created event: ${doc._id} (${event.slug})`)
  }

  console.log("Seeding teamMembers…")
  for (let i = 0; i < teamMembers.length; i++) {
    const member = teamMembers[i]
    const doc = await client.create({
      _type: "teamMember",
      name: member.name,
      role: member.role,
      bio: member.bio,
      order: i + 1,
    })
    console.log(`  created teamMember: ${doc._id} (${member.name})`)
  }

  console.log("Seeding resources…")
  for (const resource of resources) {
    const doc = await client.create({
      _type: "resource",
      slug: { _type: "slug", current: resource.slug },
      title: resource.title,
      description: resource.description,
      type: resource.type,
      downloadUrl: resource.downloadUrl,
      date: resource.date,
      ...(resource.fileSize ? { fileSize: resource.fileSize } : {}),
    })
    console.log(`  created resource: ${doc._id} (${resource.slug})`)
  }

  console.log("Seeding libraryItems…")
  for (const item of libraryItems) {
    const doc = await client.create({
      _type: "libraryItem",
      slug: { _type: "slug", current: item.slug },
      title: item.title,
      description: item.description,
      author: item.author,
      year: item.year,
      category: item.category,
      ...(item.link ? { link: item.link } : {}),
    })
    console.log(`  created libraryItem: ${doc._id} (${item.slug})`)
  }

  console.log("Seeding sisterOrgs…")
  for (const org of sisterOrgs) {
    const doc = await client.create({
      _type: "sisterOrg",
      name: org.name,
      description: org.description,
      url: org.url,
      country: org.country,
    })
    console.log(`  created sisterOrg: ${doc._id} (${org.name})`)
  }

  console.log("Seeding membershipTiers…")
  for (let i = 0; i < membershipTiers.length; i++) {
    const tier = membershipTiers[i]
    const doc = await client.create({
      _type: "membershipTier",
      name: tier.name,
      price: tier.price,
      benefits: tier.benefits,
      ...(tier.highlighted ? { highlighted: true } : {}),
      order: i + 1,
    })
    console.log(`  created membershipTier: ${doc._id} (${tier.name})`)
  }

  console.log("\nSeeding complete.")
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
