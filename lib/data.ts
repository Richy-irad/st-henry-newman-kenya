import type {
  NewsItem,
  Event,
  EventType,
  TeamMember,
  Resource,
  ResourceType,
  LibraryItem,
  LibraryCategory,
  SisterOrg,
  MembershipTier,
} from "./types"

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

export const newsItems: NewsItem[] = [
  {
    slug: "newman-canonization-anniversary-nairobi",
    title: "Newman Canonization Anniversary Celebrated in Nairobi",
    excerpt:
      "Hundreds gathered at Holy Family Basilica to mark the anniversary of Cardinal Newman's canonization with a special Mass and cultural programme.",
    content: `## A Joyful Celebration

Hundreds of faithful gathered at **Holy Family Basilica** in Nairobi on 13 October 2025 to celebrate the anniversary of Cardinal John Henry Newman's canonization by Pope Francis.

![Celebration at Holy Family Basilica](https://placeholder.co/800x400/b01c37/ffffff?text=Holy+Family+Basilica)

The event featured:

- A solemn High Mass celebrated by Archbishop Philip Anyolo
- Readings from Newman's *Meditations and Devotions*
- A cultural programme with hymns composed by local choirs
- A panel discussion on Newman's legacy in East Africa

> "Heart speaks unto heart — and today our hearts spoke in unison." — Fr. Joseph Mukuna, Association Chairman

The celebration concluded with a reception in the basilica gardens, where members shared Kenyan tea and mandazi while discussing plans for the coming year.`,
    date: "2025-10-13",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=Canonization+Anniversary",
    author: "Editorial Team",
  },
  {
    slug: "swahili-translation-project-launch",
    title: "Association Launches Swahili Translation Project",
    excerpt:
      "A landmark initiative to translate Newman's key works into Swahili, making his thought accessible to millions across East Africa.",
    content: `## Bringing Newman to East Africa

The St. John Henry Newman & Friends Association Kenya has launched an ambitious project to translate Cardinal Newman's most important works into **Swahili**, the lingua franca of East Africa.

![Translation Project](https://placeholder.co/800x400/c5973e/ffffff?text=Swahili+Translation)

### Works Selected for Translation

1. *Apologia Pro Vita Sua* — Newman's spiritual autobiography
2. *The Idea of a University* — his vision for Catholic higher education
3. *An Essay on the Development of Christian Doctrine* — foundational theological work

### The Team

The translation committee is led by **Prof. Patrick Ochieng** of the Catholic University of Eastern Africa (CUEA), with support from the Department of Languages at the University of Nairobi.

> "Newman wrote in the language of Victorian England, but his ideas are universal. It is time they spoke Swahili." — Prof. Ochieng

The first volume is expected by **December 2026**. Funding has been secured through a grant from the Pontifical Council for Culture.`,
    date: "2026-01-20",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=Swahili+Translation",
    author: "Prof. Patrick Ochieng",
  },
  {
    slug: "bishop-ojwang-keynote-conscience",
    title: "Bishop Ojwang Delivers Keynote on Conscience in Africa",
    excerpt:
      "At the annual Newman Lecture, Bishop Ojwang explored how Newman's theology of conscience speaks to contemporary African moral challenges.",
    content: `## The 2026 Newman Lecture

Bishop David Ojwang of Homa Bay delivered a powerful keynote address at the **2026 Annual Newman Lecture**, held at Strathmore University on 15 March.

![Bishop Ojwang at Strathmore](https://placeholder.co/800x400/b01c37/ffffff?text=Newman+Lecture+2026)

### Key Themes

Bishop Ojwang's lecture, titled *"The Aboriginal Vicar of Christ: Newman's Conscience and the African Moral Imagination"*, touched on several themes:

- **Conscience as the voice of God** — Newman's understanding resonates deeply with African traditions of moral discernment
- **The sovereignty of conscience** — implications for political engagement in East Africa
- **Conscience and community** — how Newman's individualism is balanced by Ubuntu philosophy

### A Standing Ovation

The lecture drew over 300 attendees, including faculty from four Nairobi universities, clergy, and members of the diplomatic corps. Bishop Ojwang received a standing ovation.

The full text of the lecture will be published in our upcoming quarterly newsletter.`,
    date: "2026-03-15",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=Newman+Lecture",
    author: "Dr. Mary Wanjiku",
  },
  {
    slug: "study-circle-strathmore-university",
    title: "New Study Circle Opens at Strathmore University",
    excerpt:
      "Students and faculty at Strathmore launch a weekly Newman Study Circle, reading and discussing his works every Thursday evening.",
    content: `## A New Home for Newman Studies

**Strathmore University** has become the home of a new weekly Newman Study Circle, meeting every Thursday at 6:00 PM in the university chapel conference room.

![Strathmore Study Circle](https://placeholder.co/800x400/c5973e/ffffff?text=Study+Circle)

### Format

Each session follows a simple format:

1. **Reading** — A passage from one of Newman's works (30 minutes)
2. **Discussion** — Open dialogue on the text and its relevance (45 minutes)
3. **Prayer** — Closing with Newman's *Radiating Christ* prayer (5 minutes)

### Current Reading

The circle is currently working through *The Grammar of Assent*, Newman's philosophical masterpiece on the nature of belief.

### How to Join

The Study Circle is open to all — students, faculty, and members of the public. No prior knowledge of Newman is required. Contact **Dr. Francis Kamau** for details.`,
    date: "2025-11-05",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=Study+Circle",
    author: "Dr. Francis Kamau",
  },
  {
    slug: "cuea-theology-partnership",
    title: "Partnership with CUEA Theology Department Announced",
    excerpt:
      "A new academic partnership will see the Association collaborate with CUEA on research, lectures, and a future Newman Studies certificate.",
    content: `## Academic Partnership

The Association is proud to announce a formal partnership with the **Department of Theology at the Catholic University of Eastern Africa (CUEA)**.

![CUEA Partnership](https://placeholder.co/800x400/b01c37/ffffff?text=CUEA+Partnership)

### What the Partnership Includes

- **Joint lecture series** — Two public lectures per semester on Newman's theology
- **Research collaboration** — Faculty access to the Association's Newman library
- **Student placements** — CUEA theology students can intern with the Association
- **Certificate programme** — A planned *Certificate in Newman Studies*, pending academic senate approval

### Signing Ceremony

The memorandum of understanding was signed on 10 February 2026 by **Fr. Joseph Mukuna** (Association Chairman) and **Prof. Scholastica Gitau** (Dean, Faculty of Theology, CUEA).

> "This partnership is a natural fit. Newman was, above all, an educator — and CUEA is committed to the same vision of Catholic intellectual life." — Prof. Gitau`,
    date: "2026-02-10",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=CUEA+Partnership",
    author: "Editorial Team",
  },
]

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const events: Event[] = [
  {
    slug: "newman-university-african-perspectives",
    title: "Newman and the Idea of a University: African Perspectives",
    description:
      "A two-day conference exploring how Newman's vision for university education applies to the African higher-education landscape today.",
    type: "Conference",
    date: "2026-06-12",
    endDate: "2026-06-13",
    location: "Strathmore University, Nairobi",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=African+Perspectives",
    registrationUrl: "https://example.com/register/african-perspectives",
  },
  {
    slug: "heart-speaks-unto-heart-retreat",
    title: "Heart Speaks unto Heart: A Newman Retreat",
    description:
      "A weekend retreat centred on Newman's motto 'Cor ad Cor Loquitur', with guided meditations, silence, and communal prayer.",
    type: "Retreat",
    date: "2026-08-22",
    endDate: "2026-08-24",
    location: "Consolata Shrine, Westlands, Nairobi",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=Newman+Retreat",
    registrationUrl: "https://example.com/register/heart-retreat",
  },
  {
    slug: "development-of-doctrine-symposium",
    title: "Development of Doctrine in the African Context",
    description:
      "An academic symposium examining Newman's Essay on Development and its implications for inculturation theology in Africa.",
    type: "Symposium",
    date: "2026-05-08",
    location: "Catholic University of Eastern Africa (CUEA), Langata",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=Doctrine+Symposium",
  },
  {
    slug: "faith-reason-east-african-education",
    title: "Faith and Reason in East African Education",
    description:
      "A one-day conference on the relationship between faith and reason in Kenya's educational institutions, inspired by Newman's thought.",
    type: "Conference",
    date: "2026-09-18",
    location: "Kenyatta University, Kahawa, Nairobi",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=Faith+and+Reason",
    registrationUrl: "https://example.com/register/faith-reason",
  },
  {
    slug: "grammar-of-assent-weekend",
    title: "Grammar of Assent: A Weekend of Reflection",
    description:
      "A contemplative retreat exploring Newman's Grammar of Assent, blending philosophical inquiry with prayer and reflection in the Rift Valley.",
    type: "Retreat",
    date: "2026-07-11",
    endDate: "2026-07-13",
    location: "Subukia National Shrine, Nakuru County",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=Grammar+of+Assent",
  },
]

// ---------------------------------------------------------------------------
// Team Members
// ---------------------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  {
    name: "Fr. Joseph Mukuna",
    role: "Chairman",
    bio: "A priest of the Archdiocese of Nairobi with a doctorate in ecclesiology from the Gregorian University, Rome. He has championed Newman studies in Kenya since 2015.",
    image: "https://placeholder.co/400x400/c5973e/ffffff?text=JM",
  },
  {
    name: "Dr. Mary Wanjiku",
    role: "Vice Chairperson",
    bio: "A lecturer in philosophy at the University of Nairobi, specialising in 19th-century British thought. She coordinates the Association's annual Newman Lecture series.",
    image: "https://placeholder.co/400x400/c5973e/ffffff?text=MW",
  },
  {
    name: "Prof. Patrick Ochieng",
    role: "Secretary",
    bio: "Professor of English and Translation at CUEA. He leads the Swahili Translation Project, bringing Newman's works to a wider East African readership.",
    image: "https://placeholder.co/400x400/c5973e/ffffff?text=PO",
  },
  {
    name: "Sr. Agnes Muthoni",
    role: "Treasurer",
    bio: "A member of the Sisters of Mary and a certified accountant. She manages the Association's finances and oversees fundraising for educational programmes.",
    image: "https://placeholder.co/400x400/c5973e/ffffff?text=AM",
  },
  {
    name: "Dr. Francis Kamau",
    role: "Librarian",
    bio: "A theologian and bibliophile who curates the Association's Newman library at Strathmore University. He also facilitates the weekly Study Circle.",
    image: "https://placeholder.co/400x400/c5973e/ffffff?text=FK",
  },
]

// ---------------------------------------------------------------------------
// Resources
// ---------------------------------------------------------------------------

export const resources: Resource[] = [
  {
    slug: "newman-african-higher-education",
    title: "Newman's Relevance for African Higher Education",
    description:
      "A comprehensive study examining how Newman's educational philosophy can inform university reform across East Africa.",
    type: "publications",
    downloadUrl: "#",
    date: "2025-06-15",
    fileSize: "2.4 MB",
  },
  {
    slug: "quarterly-newsletter-vol-12",
    title: "Quarterly Newsletter — Vol. 12",
    description:
      "The latest edition of our newsletter, featuring articles on the Swahili Translation Project and the 2026 lecture series schedule.",
    type: "publications",
    downloadUrl: "#",
    date: "2026-01-01",
    fileSize: "1.8 MB",
  },
  {
    slug: "conscience-culture-kenyan-reading",
    title: "Conscience and Culture: A Kenyan Reading of Newman",
    description:
      "An academic study exploring Newman's theology of conscience through the lens of Kenyan cultural and moral traditions.",
    type: "studies",
    downloadUrl: "#",
    date: "2025-09-20",
    fileSize: "3.1 MB",
  },
  {
    slug: "newman-inculturation-theology",
    title: "Newman and Inculturation Theology",
    description:
      "A research paper on how Newman's theory of doctrinal development supports the inculturation of Christianity in African contexts.",
    type: "studies",
    downloadUrl: "#",
    date: "2025-04-10",
    fileSize: "2.7 MB",
  },
  {
    slug: "association-constitution-2024",
    title: "Association Constitution (2024)",
    description:
      "The governing document of the St. John Henry Newman & Friends Association Kenya, ratified at the 2024 Annual General Meeting.",
    type: "documents",
    downloadUrl: "#",
    date: "2024-03-22",
    fileSize: "540 KB",
  },
  {
    slug: "annual-report-2025",
    title: "Annual Report 2025",
    description:
      "A summary of the Association's activities, finances, and achievements during the 2025 calendar year.",
    type: "documents",
    downloadUrl: "#",
    date: "2026-02-01",
    fileSize: "4.2 MB",
  },
]

// ---------------------------------------------------------------------------
// Library
// ---------------------------------------------------------------------------

export const libraryItems: LibraryItem[] = [
  {
    slug: "apologia-pro-vita-sua",
    title: "Apologia Pro Vita Sua",
    description:
      "Newman's celebrated spiritual autobiography, tracing his intellectual and religious journey from Anglicanism to the Catholic Church.",
    author: "John Henry Newman",
    year: 1864,
    category: "works",
    link: "https://www.newmanreader.org/works/apologia/",
  },
  {
    slug: "essay-development-christian-doctrine",
    title: "An Essay on the Development of Christian Doctrine",
    description:
      "Newman's groundbreaking argument that Catholic doctrine develops organically while remaining faithful to its apostolic origins.",
    author: "John Henry Newman",
    year: 1845,
    category: "works",
    link: "https://www.newmanreader.org/works/development/",
  },
  {
    slug: "grammaire-assentiment-french",
    title: "Grammaire de l'Assentiment",
    description:
      "The authoritative French translation of Newman's Grammar of Assent, his philosophical inquiry into the nature of belief and certitude.",
    author: "John Henry Newman (trans. M.-M. Olive)",
    year: 1975,
    category: "translations",
  },
  {
    slug: "idea-universita-italian",
    title: "L'Idea di Università",
    description:
      "The Italian translation of The Idea of a University, Newman's influential lectures on the purpose of Catholic higher education.",
    author: "John Henry Newman (trans. A. Luzi)",
    year: 1990,
    category: "translations",
  },
  {
    slug: "grammar-african-oral-epistemology",
    title: "Newman's Grammar and African Oral Epistemology",
    description:
      "An article exploring parallels between Newman's illative sense and modes of knowing rooted in African oral traditions.",
    author: "Patrick Ochieng",
    year: 2024,
    category: "articles",
    link: "#",
  },
  {
    slug: "cor-ad-cor-kenyan-spirituality",
    title: "Cor ad Cor: Newman and Kenyan Spirituality",
    description:
      "A reflection on how Newman's personal motto 'Heart speaks unto Heart' resonates with Kenyan forms of communal prayer and devotion.",
    author: "Mary Wanjiku",
    year: 2025,
    category: "articles",
    link: "#",
  },
]

// ---------------------------------------------------------------------------
// Sister Organisations
// ---------------------------------------------------------------------------

export const sisterOrgs: SisterOrg[] = [
  {
    name: "Association Française des Amis de Newman (AFAN)",
    description:
      "A French association dedicated to promoting the thought and legacy of Cardinal Newman through publications, conferences, and pilgrimages.",
    url: "https://example.com/afan",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=AFAN+France",
    country: "France",
  },
  {
    name: "Centro Internazionale degli Amici di Newman",
    description:
      "Based in Rome, this centre coordinates Newman studies across Italy and organises annual events at the Oratory of San Filippo Neri.",
    url: "https://example.com/centro-newman",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=Centro+Newman+Italy",
    country: "Italy",
  },
  {
    name: "The Newman Association",
    description:
      "A UK-based lay Catholic organisation that fosters dialogue between faith and culture in the spirit of Cardinal Newman.",
    url: "https://example.com/newman-uk",
    image: "https://placeholder.co/800x600/b01c37/ffffff?text=Newman+Assoc+UK",
    country: "United Kingdom",
  },
  {
    name: "National Institute for Newman Studies",
    description:
      "An American research institute preserving Newman's writings and advancing scholarly study of his contributions to theology and education.",
    url: "https://example.com/nins",
    image: "https://placeholder.co/800x600/c5973e/ffffff?text=NINS+USA",
    country: "United States",
  },
]

// ---------------------------------------------------------------------------
// Membership Tiers
// ---------------------------------------------------------------------------

export const membershipTiers: MembershipTier[] = [
  {
    name: "Student",
    price: "KES 500/year",
    benefits: [
      "Access to the Newman Library",
      "Invitations to all public lectures",
      "Digital copy of the quarterly newsletter",
    ],
  },
  {
    name: "Regular",
    price: "KES 2,000/year",
    highlighted: true,
    benefits: [
      "All Student benefits",
      "Voting rights at the Annual General Meeting",
      "Priority registration for retreats and conferences",
      "Printed quarterly newsletter",
      "10% discount on Association publications",
    ],
  },
  {
    name: "Patron",
    price: "KES 10,000/year",
    benefits: [
      "All Regular benefits",
      "Name listed in the Annual Report",
      "Reserved seating at the Annual Newman Lecture",
      "Complimentary copy of all new publications",
      "Invitation to the Chairman's private dinner",
      "Dedicated spiritual bouquet from the community",
      "Tax-deductible receipt for donations",
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find((item) => item.slug === slug)
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((item) => item.slug === slug)
}

export function getEventsByType(type: EventType): Event[] {
  return events.filter((item) => item.type === type)
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter((item) => item.type === type)
}

export function getLibraryByCategory(category: LibraryCategory): LibraryItem[] {
  return libraryItems.filter((item) => item.category === category)
}

export function searchLibrary(query: string): LibraryItem[] {
  const q = query.toLowerCase()
  return libraryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  )
}

export function getLatestNews(count?: number): NewsItem[] {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  return count ? sorted.slice(0, count) : sorted
}

export function getUpcomingEvents(count?: number): Event[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  return count ? sorted.slice(0, count) : sorted
}
