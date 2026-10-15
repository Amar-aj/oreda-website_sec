export type DocKind = 'NIT' | 'RFP' | 'Corrigendum' | 'Clarification' | 'Addendum'

export interface TenderDocument {
  id: string
  kind: DocKind
  title: string
  publishedOn: string
  note?: string
  href: string
  size: string
}

export interface Tender {
  id: number
  ref: string
  title: string
  category: string
  status: 'Open' | 'Closed'
  publishedOn: string
  closesOn: string
  openingOn?: string
  emd?: string
  summary: string
  documents: TenderDocument[]
}

export const NEW_BADGE_DAYS = 4
export const CLOSING_SOON_DAYS = 7

export function labelDaysAgo(days: number) {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - days)
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function parseBoardDate(value: string) {
  const cleaned = value.replace(',', '').trim()
  const match = cleaned.match(
    /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?$/i,
  )
  if (!match) {
    const fallback = Date.parse(cleaned)
    return Number.isNaN(fallback) ? null : new Date(fallback)
  }

  const months: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }
  const day = Number(match[1])
  const month =
    months[match[2].slice(0, 1).toUpperCase() + match[2].slice(1, 3).toLowerCase()]
  const year = Number(match[3])
  if (month === undefined) return null

  let hours = 12
  let minutes = 0
  if (match[4] && match[5] && match[6]) {
    hours = Number(match[4]) % 12
    if (match[6].toUpperCase() === 'PM') hours += 12
    minutes = Number(match[5])
  }

  return new Date(year, month, day, hours, minutes, 0, 0)
}

export function isWithinNewWindow(dateStr: string) {
  const published = parseBoardDate(dateStr)
  if (!published) return false
  const ageMs = Date.now() - published.getTime()
  if (ageMs < 0) return false
  return ageMs <= NEW_BADGE_DAYS * 24 * 60 * 60 * 1000
}

export function isNewTender(tender: Tender) {
  return isWithinNewWindow(tender.publishedOn)
}

export function isNewDocument(doc: TenderDocument) {
  return isWithinNewWindow(doc.publishedOn)
}

/** Oldest published tender = 1, newest = N (display newest first so N is on top). */
export function getTenderSerialMap(): Map<number, number> {
  const sorted = [...tenders].sort((a, b) => {
    const aTime = parseBoardDate(a.publishedOn)?.getTime() ?? 0
    const bTime = parseBoardDate(b.publishedOn)?.getTime() ?? 0
    if (aTime !== bTime) return aTime - bTime
    return a.id - b.id
  })
  const map = new Map<number, number>()
  sorted.forEach((tender, index) => {
    map.set(tender.id, index + 1)
  })
  return map
}

export function getTenderSerial(tenderId: number) {
  return getTenderSerialMap().get(tenderId) ?? tenderId
}

export function getDocumentSerial(tenderId: number, docIndex: number) {
  return `${getTenderSerial(tenderId)}.${docIndex + 1}`
}

export const tenders: Tender[] = [
  {
    id: 1,
    ref: 'OREDA/SPV/2026/14',
    title: 'Rooftop solar PV — supply, installation & commissioning',
    category: 'Solar PV',
    status: 'Open',
    publishedOn: '01 Oct 2026',
    closesOn: '28 Oct 2026, 5:00 PM',
    openingOn: '30 Oct 2026',
    emd: '₹2,50,000',
    summary:
      'Design, supply, installation and commissioning of grid-connected rooftop solar PV systems under OREDA programmes across selected districts.',
    documents: [
      {
        id: 'd1a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '01 Oct 2026',
        href: '/documents/tenders/spv-2026-14-nit.pdf',
        size: '420 KB',
      },
      {
        id: 'd1b',
        kind: 'RFP',
        title: 'Request for Proposal — original',
        publishedOn: '01 Oct 2026',
        note: 'Baseline RFP with technical specifications and BOQ.',
        href: '/documents/tenders/spv-2026-14-rfp.pdf',
        size: '2.1 MB',
      },
      {
        id: 'd1c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: '08 Oct 2026',
        note: 'Extended bid submission date and revised payment schedule (Clause 4.2).',
        href: '/documents/tenders/spv-2026-14-corr-01.pdf',
        size: '310 KB',
      },
      {
        id: 'd1d',
        kind: 'Clarification',
        title: 'Pre-bid clarifications',
        publishedOn: '12 Oct 2026',
        note: 'Responses to queries raised in the pre-bid meeting held on 10 Oct 2026.',
        href: '/documents/tenders/spv-2026-14-clarifications.pdf',
        size: '540 KB',
      },
      {
        id: 'd1e',
        kind: 'Corrigendum',
        title: 'Corrigendum — 02',
        publishedOn: labelDaysAgo(1),
        note: 'Updated technical eligibility criteria for EPC experience.',
        href: '/documents/tenders/spv-2026-14-corr-02.pdf',
        size: '280 KB',
      },
    ],
  },
  {
    id: 2,
    ref: 'OREDA/SSL/2026/09',
    title: 'Solar LED street lighting for rural blocks',
    category: 'Street lighting',
    status: 'Open',
    publishedOn: '20 Sep 2026',
    closesOn: '18 Oct 2026, 5:00 PM',
    openingOn: '20 Oct 2026',
    emd: '₹1,00,000',
    summary:
      'Supply and installation of solar LED street lighting systems in identified rural blocks with five-year comprehensive maintenance.',
    documents: [
      {
        id: 'd2a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '20 Sep 2026',
        href: '/documents/tenders/ssl-2026-09-nit.pdf',
        size: '390 KB',
      },
      {
        id: 'd2b',
        kind: 'RFP',
        title: 'Detailed tender document',
        publishedOn: '20 Sep 2026',
        href: '/documents/tenders/ssl-2026-09-rfp.pdf',
        size: '1.8 MB',
      },
      {
        id: 'd2c',
        kind: 'Addendum',
        title: 'Addendum — site list update',
        publishedOn: '05 Oct 2026',
        note: 'Revised village / block-wise installation schedule (Annexure-B).',
        href: '/documents/tenders/ssl-2026-09-addendum.pdf',
        size: '650 KB',
      },
    ],
  },
  {
    id: 3,
    ref: 'OREDA/BIO/2026/03',
    title: 'Community biogas plant O&M services',
    category: 'Biogas',
    status: 'Open',
    publishedOn: labelDaysAgo(2),
    closesOn: '12 Nov 2026, 5:00 PM',
    openingOn: '14 Nov 2026',
    emd: '₹75,000',
    summary:
      'Operation and maintenance of community biogas plants including feedstock management, safety compliance and beneficiary support.',
    documents: [
      {
        id: 'd3a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: labelDaysAgo(2),
        href: '/documents/tenders/bio-2026-03-nit.pdf',
        size: '360 KB',
      },
      {
        id: 'd3b',
        kind: 'RFP',
        title: 'RFP & scope of work',
        publishedOn: labelDaysAgo(2),
        href: '/documents/tenders/bio-2026-03-rfp.pdf',
        size: '1.4 MB',
      },
    ],
  },
  {
    id: 4,
    ref: 'OREDA/HYB/2026/01',
    title: 'Hybrid renewable energy feasibility study',
    category: 'Consultancy',
    status: 'Open',
    publishedOn: '10 Oct 2026',
    closesOn: '20 Nov 2026, 3:00 PM',
    openingOn: '22 Nov 2026',
    emd: '₹50,000',
    summary:
      'Techno-economic feasibility study for hybrid solar-wind and storage configurations at prioritised sites in Odisha.',
    documents: [
      {
        id: 'd4a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '10 Oct 2026',
        href: '/documents/tenders/hyb-2026-01-nit.pdf',
        size: '340 KB',
      },
      {
        id: 'd4b',
        kind: 'RFP',
        title: 'Terms of reference',
        publishedOn: '10 Oct 2026',
        href: '/documents/tenders/hyb-2026-01-rfp.pdf',
        size: '980 KB',
      },
      {
        id: 'd4c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: labelDaysAgo(0),
        note: 'Clarified consultant team composition and deliverable timelines.',
        href: '/documents/tenders/hyb-2026-01-corr-01.pdf',
        size: '220 KB',
      },
    ],
  },
  {
    id: 5,
    ref: 'OREDA/SPV/2025/22',
    title: 'Off-grid solar water pumping systems',
    category: 'Solar PV',
    status: 'Closed',
    publishedOn: '12 Jun 2025',
    closesOn: '15 Jul 2025, 5:00 PM',
    openingOn: '18 Jul 2025',
    emd: '₹1,50,000',
    summary:
      'Supply and installation of off-grid solar water pumping systems for agricultural beneficiaries (archived notice).',
    documents: [
      {
        id: 'd5a',
        kind: 'NIT',
        title: 'Notice Inviting Tender',
        publishedOn: '12 Jun 2025',
        href: '/documents/tenders/spv-2025-22-nit.pdf',
        size: '400 KB',
      },
      {
        id: 'd5b',
        kind: 'RFP',
        title: 'Tender document',
        publishedOn: '12 Jun 2025',
        href: '/documents/tenders/spv-2025-22-rfp.pdf',
        size: '1.6 MB',
      },
      {
        id: 'd5c',
        kind: 'Corrigendum',
        title: 'Corrigendum — 01',
        publishedOn: '28 Jun 2025',
        note: 'Final corrigendum before bid closing.',
        href: '/documents/tenders/spv-2025-22-corr-01.pdf',
        size: '190 KB',
      },
    ],
  },
]

export type TenderNotice =
  | {
      id: string
      type: 'tender'
      date: string
      tenderId: number
      tenderRef: string
      tenderTitle: string
      serial: string
    }
  | {
      id: string
      type: 'document'
      date: string
      tenderId: number
      tenderRef: string
      tenderTitle: string
      docKind: DocKind
      docTitle: string
      href: string
      serial: string
    }

export function getRecentNotices(): TenderNotice[] {
  const notices: TenderNotice[] = []
  const serialMap = getTenderSerialMap()

  for (const tender of tenders) {
    const tenderIsNew = isNewTender(tender)
    const tenderSerial = serialMap.get(tender.id) ?? tender.id

    if (tenderIsNew) {
      notices.push({
        id: `tender-${tender.id}`,
        type: 'tender',
        date: tender.publishedOn,
        tenderId: tender.id,
        tenderRef: tender.ref,
        tenderTitle: tender.title,
        serial: String(tenderSerial),
      })
    }

    tender.documents.forEach((doc, docIndex) => {
      if (!isNewDocument(doc)) return
      // Skip initial pack docs when the tender itself is newly published
      if (tenderIsNew && doc.publishedOn === tender.publishedOn) return

      notices.push({
        id: `doc-${doc.id}`,
        type: 'document',
        date: doc.publishedOn,
        tenderId: tender.id,
        tenderRef: tender.ref,
        tenderTitle: tender.title,
        docKind: doc.kind,
        docTitle: doc.title,
        href: doc.href,
        serial: `${tenderSerial}.${docIndex + 1}`,
      })
    })
  }

  return notices.sort((a, b) => {
    const aTime = parseBoardDate(a.date)?.getTime() ?? 0
    const bTime = parseBoardDate(b.date)?.getTime() ?? 0
    return bTime - aTime
  })
}
