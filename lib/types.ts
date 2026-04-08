export type EventType = "Conference" | "Retreat" | "Symposium"
export type ResourceType = "publications" | "studies" | "documents"
export type LibraryCategory = "works" | "translations" | "articles"

export interface NewsItem {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  image: string
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
  image: string
  registrationUrl?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
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
  image: string
  country: string
}

export interface MembershipTier {
  name: string
  price: string
  benefits: string[]
  highlighted?: boolean
}
