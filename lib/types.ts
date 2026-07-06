export type EventType = "Conference" | "Retreat" | "Symposium"
export type ResourceType = "publications" | "studies" | "documents"
export type LibraryCategory = "works" | "translations" | "articles"

export interface NewsItem {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  image: string | null
  author?: string
}

export interface Event {
  slug: string
  title: string
  description: string
  type: EventType
  date: string
  endDate?: string
  location: string
  image: string | null
  registrationUrl?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string | null
}

export interface Resource {
  slug: string
  title: string
  description: string
  type: ResourceType
  downloadUrl: string
  date: string
  fileSize?: string
}

export interface LibraryItem {
  slug: string
  title: string
  description: string
  author: string
  year: number
  category: LibraryCategory
  link?: string
}

export interface SisterOrg {
  name: string
  description: string
  url: string
  image: string | null
  country: string
}

export interface MembershipTier {
  name: string
  price: string
  benefits: string[]
  highlighted?: boolean
}

export interface Celebration {
  name: string
  slug: string
  description?: string
}

export interface AgendaItem {
  slug: string
  title: string
  startDate: string
  endDate?: string
  time?: string
  location: string
  followUrl?: string
  followNote?: string
  content?: string
  coverImage?: string | null
  gallery?: { url: string; caption?: string }[]
  celebration?: { name: string; slug: string }
}
