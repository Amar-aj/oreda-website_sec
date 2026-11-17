import { awards } from '@/data/awards'
import { tenders } from '@/data/tenders'
import type { RouteLocationRaw } from 'vue-router'

export type SearchCategory =
  | 'Page'
  | 'About'
  | 'Home'
  | 'Leadership'
  | 'Scheme'
  | 'News'
  | 'Tender'
  | 'Award'
  | 'Career'
  | 'Contact'
  | 'Gallery'
  | 'Legal'

export interface SiteSearchItem {
  id: string
  title: string
  body: string
  pageLabel: string
  to: string
  hash?: string
  category: SearchCategory
  keywords?: string
}

export interface SiteSearchHit {
  item: SiteSearchItem
  snippet: string
  score: number
}

export function getSearchLocation(item: SiteSearchItem): RouteLocationRaw {
  return item.hash ? { path: item.to, hash: `#${item.hash}` } : { path: item.to }
}

const pages: SiteSearchItem[] = [
  {
    id: 'page-home',
    title: 'Home',
    body: 'OREDA Limited — schemes, news, projects and renewable energy updates for Odisha.',
    pageLabel: 'Home',
    to: '/',
    hash: 'hero',
    category: 'Page',
    keywords: 'oreda odisha renewable energy',
  },
  {
    id: 'page-about',
    title: 'About Us',
    body: 'Organisation overview, mandate and role of OREDA as Odisha renewable energy nodal agency.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'about-hero',
    category: 'Page',
    keywords: 'nodal agency department of energy',
  },
  {
    id: 'page-leadership',
    title: 'Leadership',
    body: "Who's who — officials and leadership directory.",
    pageLabel: 'Leadership',
    to: '/leadership',
    hash: 'who-directory',
    category: 'Page',
    keywords: 'who is who officials ceo acs',
  },
  {
    id: 'page-career',
    title: 'Career',
    body: 'Career opportunities and recruitment information.',
    pageLabel: 'Career',
    to: '/career',
    hash: 'career-openings',
    category: 'Page',
    keywords: 'jobs recruitment vacancy',
  },
  {
    id: 'page-projects',
    title: 'Our Projects',
    body: 'Renewable energy projects implemented across Odisha.',
    pageLabel: 'Our Projects',
    to: '/projects',
    category: 'Page',
  },
  {
    id: 'page-tenders',
    title: 'Tenders',
    body: 'Active and closed tenders, NITs and corrigenda.',
    pageLabel: 'Tenders',
    to: '/tenders',
    hash: 'tender-board',
    category: 'Page',
    keywords: 'nit rfp bid procurement',
  },
  {
    id: 'page-schemes',
    title: 'Schemes',
    body: 'Citizen and institutional renewable-energy schemes.',
    pageLabel: 'Home',
    to: '/',
    hash: 'schemes',
    category: 'Page',
    keywords: 'pm surya ghar kusum subsidy',
  },
  {
    id: 'page-news',
    title: 'News & Updates',
    body: 'Latest announcements, events and agency updates.',
    pageLabel: 'Home',
    to: '/',
    hash: 'latest-news',
    category: 'Page',
  },
  {
    id: 'page-notifications',
    title: 'Notifications',
    body: 'Official notifications and circulars.',
    pageLabel: 'Notifications',
    to: '/notifications',
    category: 'Page',
  },
  {
    id: 'page-gallery',
    title: 'Photo Gallery',
    body: 'Photos from programmes, events and field activities.',
    pageLabel: 'Photo Gallery',
    to: '/gallery',
    hash: 'gallery-showcase',
    category: 'Page',
  },
  {
    id: 'page-awards',
    title: 'Awards & Recognition',
    body: 'Awards, recognitions and sector accolades received by OREDA.',
    pageLabel: 'Awards & Recognition',
    to: '/awards',
    hash: 'awards-showcase',
    category: 'Page',
    keywords: 'skoch nsefi recognition',
  },
  {
    id: 'page-contact',
    title: 'Contact Us',
    body: 'Phone, email, office address and location map.',
    pageLabel: 'Contact Us',
    to: '/contact',
    hash: 'contact-main',
    category: 'Page',
    keywords: 'mancheswar bhubaneswar',
  },
  {
    id: 'page-vendor-empanelment',
    title: 'Vendor Empanelment',
    body: 'Vendor signup, login and 16-stage BID document empanelment process with OREDA.',
    pageLabel: 'Vendor Empanelment',
    to: '/vendor-empanelment',
    category: 'Page',
    keywords: 'vendor bid empanelment registration login signup',
  },
  {
    id: 'page-privacy',
    title: 'Privacy Policy',
    body: 'How personal information is handled on this website.',
    pageLabel: 'Privacy Policy',
    to: '/privacy',
    hash: 'who',
    category: 'Page',
  },
  {
    id: 'page-terms',
    title: 'Terms of Use',
    body: 'Terms governing use of the OREDA website.',
    pageLabel: 'Terms of Use',
    to: '/terms',
    hash: 'accept',
    category: 'Page',
  },
]

const content: SiteSearchItem[] = [
  {
    id: 'about-hero',
    title: 'Powering Odisha clean energy future',
    body: 'OREDA is the Government of Odisha nodal agency for renewable energy—delivering solar programmes, citizen schemes and clean-power projects that make sustainable energy accessible across the state.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'about-hero',
    category: 'About',
    keywords: 'since 1984 nodal agency',
  },
  {
    id: 'about-intro',
    title: 'A nodal agency for clean energy progress',
    body: 'As the nodal agency under the Department of Energy, Government of Odisha, OREDA Limited promotes solar, wind and other clean-energy solutions through policy support, project implementation and stakeholder partnerships.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'about-intro',
    category: 'About',
  },
  {
    id: 'about-vision',
    title: 'Vision — a renewable Odisha',
    body: 'To establish Odisha as a national leader in renewable energy adoption—delivering affordable, reliable and sustainable power that strengthens livelihoods, communities and long-term energy security across all thirty districts.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'vision-mission',
    category: 'About',
  },
  {
    id: 'about-mission',
    title: 'Mission — practical clean-energy action',
    body: 'To promote, facilitate and implement renewable energy programmes through innovative schemes, technology and partnerships—making solar and clean power accessible, transparent and citizen-focused.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'vision-mission',
    category: 'About',
  },
  {
    id: 'about-pathway',
    title: 'Delivery Pathway',
    body: 'A clear journey from need to lasting clean energy through assessment, design, engagement, implementation and sustained impact.',
    pageLabel: 'About Us',
    to: '/about',
    hash: 'delivery-pathway',
    category: 'About',
  },
  {
    id: 'home-hero-solar',
    title: 'Powering Odisha with the Sun',
    body: 'Scaling solar energy across the state to deliver clean, reliable power for every community.',
    pageLabel: 'Home',
    to: '/',
    hash: 'hero',
    category: 'Home',
    keywords: 'solar mission',
  },
  {
    id: 'home-hero-wind',
    title: 'Harnessing Coastal Winds',
    body: 'Advancing wind energy initiatives that strengthen Odisha renewable capacity and energy security.',
    pageLabel: 'Home',
    to: '/',
    hash: 'hero',
    category: 'Home',
    keywords: 'wind energy',
  },
  {
    id: 'home-hero-rural',
    title: 'Clean Energy for Every Village',
    body: 'Bringing rooftop solar and decentralized solutions to rural households, schools, and livelihoods.',
    pageLabel: 'Home',
    to: '/',
    hash: 'hero',
    category: 'Home',
  },
  {
    id: 'home-about-blurb',
    title: 'Driving a Cleaner, Greener and Brighter Odisha',
    body: 'OREDA Limited, under the Department of Energy, Government of Odisha, is committed to promoting renewable energy through innovative policies, sustainable projects and strategic partnerships.',
    pageLabel: 'Home',
    to: '/',
    hash: 'about-oreda',
    category: 'Home',
  },
  {
    id: 'home-impact',
    title: '780+ MW Renewable Capacity',
    body: 'Installed across Odisha. State renewable capacity crosses 780 MW with solar leading growth.',
    pageLabel: 'Home',
    to: '/',
    hash: 'impact',
    category: 'Home',
    keywords: '706 mw solar 30 districts',
  },
  {
    id: 'home-achievements',
    title: 'Documented progress across key reporting years',
    body: 'Explore OREDA published achievement records — from solar programme delivery to year-wise institutional milestones.',
    pageLabel: 'Home',
    to: '/',
    hash: 'achievements',
    category: 'Home',
  },
  {
    id: 'scheme-pm-surya-ghar',
    title: 'PM Surya Ghar',
    body: 'Rooftop solar subsidy support for households to cut power bills and adopt clean energy.',
    pageLabel: 'Home · Schemes',
    to: '/',
    hash: 'scheme-1',
    category: 'Scheme',
    keywords: 'rooftop subsidy household',
  },
  {
    id: 'scheme-pm-kusum',
    title: 'PM KUSUM',
    body: 'Solar pumps and renewable energy for farmers to strengthen irrigation and livelihoods.',
    pageLabel: 'Home · Schemes',
    to: '/',
    hash: 'scheme-2',
    category: 'Scheme',
    keywords: 'farmers irrigation solar pump',
  },
  {
    id: 'scheme-rooftop-solar',
    title: 'Rooftop Solar',
    body: 'Grid-connected rooftop systems for government buildings, campuses and institutions.',
    pageLabel: 'Home · Schemes',
    to: '/',
    hash: 'scheme-3',
    category: 'Scheme',
  },
  {
    id: 'scheme-street-lighting',
    title: 'Solar Street Lighting',
    body: 'LED solar street lights improving safety and night-time access in rural blocks.',
    pageLabel: 'Home · Schemes',
    to: '/',
    hash: 'scheme-4',
    category: 'Scheme',
  },
  {
    id: 'scheme-biogas',
    title: 'Biogas Programmes',
    body: 'Community and household biogas solutions supporting rural energy and waste use.',
    pageLabel: 'Home · Schemes',
    to: '/',
    hash: 'scheme-5',
    category: 'Scheme',
  },
  {
    id: 'news-rooftop-subsidy',
    title: 'OREDA launches new rooftop solar subsidy scheme for households',
    body: 'Eligible households across Odisha can now apply for enhanced subsidies under the revised rooftop solar programme.',
    pageLabel: 'Home · News',
    to: '/',
    hash: 'latest-news',
    category: 'News',
  },
  {
    id: 'news-workshop',
    title: 'State-level workshop on renewable energy held in Bhubaneswar',
    body: 'Energy department officials and stakeholders discussed solar, wind, and hybrid project implementation strategies.',
    pageLabel: 'Home · News',
    to: '/',
    hash: 'latest-news',
    category: 'News',
  },
  {
    id: 'news-street-lighting',
    title: 'Tender invited for solar street lighting in rural blocks',
    body: 'OREDA invites qualified bidders for supply, installation, and maintenance of solar LED street lighting systems.',
    pageLabel: 'Home · News',
    to: '/',
    hash: 'latest-news',
    category: 'News',
  },
  {
    id: 'news-solar-capacity',
    title: 'Odisha crosses major milestone in installed solar capacity',
    body: 'The Department of Energy reports significant growth in grid-connected and off-grid solar installations statewide.',
    pageLabel: 'Home · News',
    to: '/',
    hash: 'latest-news',
    category: 'News',
  },
  {
    id: 'who-cm',
    title: 'Shri Mohan Charan Majhi',
    body: "Hon'ble Chief Minister, Odisha — Government of Odisha",
    pageLabel: 'Leadership',
    to: '/leadership',
    hash: 'who-1',
    category: 'Leadership',
    keywords: 'chief minister',
  },
  {
    id: 'who-dcm',
    title: 'Shri Kanak Vardhan Singh Deo',
    body: "Hon'ble Deputy Chief Minister, Odisha — Government of Odisha",
    pageLabel: 'Leadership',
    to: '/leadership',
    hash: 'who-2',
    category: 'Leadership',
  },
  {
    id: 'who-acs',
    title: 'Shri Vishal Kumar Dev, IAS',
    body: 'Additional Chief Secretary, Energy — Department of Energy',
    pageLabel: 'Leadership',
    to: '/leadership',
    hash: 'who-3',
    category: 'Leadership',
    keywords: 'acs',
  },
  {
    id: 'who-ceo',
    title: 'Shri Saidutta Biplab Keshari Pradhan',
    body: 'Chief Executive Officer, OREDA',
    pageLabel: 'Leadership',
    to: '/leadership',
    hash: 'who-4',
    category: 'Leadership',
    keywords: 'ceo',
  },
  {
    id: 'career-pe-solar',
    title: 'Project Engineer — Solar',
    body: 'Support planning, execution and monitoring of solar projects and installations under OREDA programmes.',
    pageLabel: 'Career',
    to: '/career',
    hash: 'career-job-1',
    category: 'Career',
    keywords: 'engineering vacancy',
  },
  {
    id: 'career-scheme-officer',
    title: 'Scheme Coordination Officer',
    body: 'Drive citizen scheme facilitation, outreach support and inter-department coordination for renewable programmes.',
    pageLabel: 'Career',
    to: '/career',
    hash: 'career-job-2',
    category: 'Career',
  },
  {
    id: 'career-electrical',
    title: 'Electrical Engineer',
    body: 'Provide electrical engineering support for off-grid and on-grid renewable energy applications.',
    pageLabel: 'Career',
    to: '/career',
    hash: 'career-job-3',
    category: 'Career',
  },
  {
    id: 'contact-office',
    title: 'Head Office',
    body: 'S-59, Mancheswar Industrial Estate, Bhubaneswar – 751010',
    pageLabel: 'Contact Us',
    to: '/contact',
    hash: 'contact-office',
    category: 'Contact',
    keywords: 'address mancheswar',
  },
  {
    id: 'contact-phone',
    title: 'Phone',
    body: '0674 2588260',
    pageLabel: 'Contact Us',
    to: '/contact',
    hash: 'contact-phone',
    category: 'Contact',
  },
  {
    id: 'contact-email',
    title: 'Email',
    body: 'ceoreda@oredaorissa.com',
    pageLabel: 'Contact Us',
    to: '/contact',
    hash: 'contact-email',
    category: 'Contact',
  },
  {
    id: 'gallery-solar-outreach',
    title: 'Solar mission outreach',
    body: 'Citizen-facing solar scheme awareness across Odisha.',
    pageLabel: 'Photo Gallery',
    to: '/gallery',
    hash: 'gallery-2',
    category: 'Gallery',
  },
  {
    id: 'gallery-rooftop',
    title: 'Rooftop solar drive',
    body: 'Household and institutional rooftop installations underway.',
    pageLabel: 'Photo Gallery',
    to: '/gallery',
    hash: 'gallery-7',
    category: 'Gallery',
  },
  {
    id: 'privacy-who',
    title: 'Who we are',
    body: 'This website is operated by OREDA Limited (Odisha Renewable Energy Development Agency), the nodal agency under the Department of Energy, Government of Odisha.',
    pageLabel: 'Privacy Policy',
    to: '/privacy',
    hash: 'who',
    category: 'Legal',
  },
  {
    id: 'terms-filings',
    title: 'Enquiries, tenders & careers',
    body: 'Schemes, tenders, news and notices are published so citizens and bidders can read them. They do not themselves award a contract or sanction a subsidy.',
    pageLabel: 'Terms of Use',
    to: '/terms',
    hash: 'filings',
    category: 'Legal',
  },
]

function buildIndex(): SiteSearchItem[] {
  const tenderItems: SiteSearchItem[] = tenders.map((tender) => ({
    id: `tender-${tender.id}`,
    title: tender.title,
    body: `${tender.ref} · ${tender.summary}`,
    pageLabel: 'Tenders',
    to: '/tenders',
    hash: `tender-${tender.id}`,
    category: 'Tender' as const,
    keywords: `${tender.category} ${tender.status} ${tender.ref}`,
  }))

  const awardItems: SiteSearchItem[] = awards.map((award) => ({
    id: `award-${award.id}`,
    title: award.title,
    body: award.summary,
    pageLabel: 'Awards & Recognition',
    to: '/awards',
    hash: `award-${award.id}`,
    category: 'Award' as const,
    keywords: `${award.kind} ${award.date}`,
  }))

  return [...pages, ...content, ...tenderItems, ...awardItems]
}

const index = buildIndex()

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function buildMatchSnippet(text: string, query: string, radius = 72): string {
  const q = query.trim()
  if (!q) return text

  const lower = text.toLowerCase()
  const needle = q.toLowerCase()
  const at = lower.indexOf(needle)
  if (at < 0) return text.length > radius * 2 ? `${text.slice(0, radius * 2)}…` : text

  const start = Math.max(0, at - radius)
  const end = Math.min(text.length, at + needle.length + radius)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''
  return `${prefix}${text.slice(start, end)}${suffix}`
}

export function highlightParts(text: string, query: string): Array<{ text: string; match: boolean }> {
  const q = query.trim()
  if (!q) return [{ text, match: false }]

  const parts: Array<{ text: string; match: boolean }> = []
  const re = new RegExp(`(${escapeRegExp(q)})`, 'ig')
  let last = 0
  let match: RegExpExecArray | null

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push({ text: text.slice(last, match.index), match: false })
    }
    parts.push({ text: match[0], match: true })
    last = match.index + match[0].length
  }

  if (last < text.length) parts.push({ text: text.slice(last), match: false })
  return parts.length ? parts : [{ text, match: false }]
}

export function getSuggestedSearchItems(limit = 8): SiteSearchItem[] {
  return pages.slice(0, limit)
}

export function searchSite(query: string, limit = 14): SiteSearchHit[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return getSuggestedSearchItems().map((item) => ({
      item,
      snippet: item.body,
      score: 0,
    }))
  }

  const terms = q.split(/\s+/).filter(Boolean)

  const scored = index
    .map((item) => {
      const haystack = [
        item.title,
        item.body,
        item.pageLabel,
        item.category,
        item.keywords ?? '',
      ]
        .join(' ')
        .toLowerCase()

      let score = 0
      for (const term of terms) {
        if (!haystack.includes(term)) return null
        if (item.title.toLowerCase().includes(term)) score += 5
        if (item.body.toLowerCase().includes(term)) score += 3
        if (item.pageLabel.toLowerCase().includes(term)) score += 2
        if (item.keywords?.toLowerCase().includes(term)) score += 1
      }

      if (item.title.toLowerCase().startsWith(q)) score += 4
      if (item.body.toLowerCase().includes(q)) score += 2

      const source = item.body.toLowerCase().includes(q)
        ? item.body
        : item.title.toLowerCase().includes(q)
          ? item.title
          : `${item.title}. ${item.body}`

      return {
        item,
        snippet: buildMatchSnippet(source, query),
        score,
      }
    })
    .filter((entry): entry is SiteSearchHit => entry !== null)
    .sort(
      (a, b) =>
        b.score - a.score || a.item.pageLabel.localeCompare(b.item.pageLabel),
    )

  return scored.slice(0, limit)
}
