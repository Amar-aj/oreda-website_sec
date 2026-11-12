import demoCrystal from '@/assets/images/awards/demo-crystal.jpg'
import demoMedal from '@/assets/images/awards/demo-medal.jpg'
import demoStar from '@/assets/images/awards/demo-star.jpg'
import featureStar from '@/assets/images/awards/feature-star.jpg'

export type AwardKind = 'Award' | 'Recognition' | 'Accolade'

export type AwardItem = {
  id: string
  kind: AwardKind
  title: string
  summary: string
  date: string
  image: string
}

export const awards: AwardItem[] = [
  {
    id: 'best-re-implementation',
    kind: 'Award',
    title: 'Best Renewable Energy Implementation Agency',
    summary:
      'Recognized for statewide delivery of solar programmes and citizen-facing renewable-energy schemes across Odisha.',
    date: 'October 2025',
    image: featureStar,
  },
  {
    id: 'solar-power-promotion',
    kind: 'Recognition',
    title: 'Excellence in Solar Power Promotion',
    summary:
      'Honoured for advancing rooftop and off-grid solar adoption through outreach, facilitation and institutional support.',
    date: 'March 2024',
    image: demoMedal,
  },
  {
    id: 'green-energy-contribution',
    kind: 'Accolade',
    title: 'Outstanding Contribution to Green Energy',
    summary:
      'Acknowledged for sustained contribution to clean-energy transition and sustainable power initiatives in the state.',
    date: 'December 2023',
    image: demoCrystal,
  },
  {
    id: 'skoch-solar-water-kiosk',
    kind: 'Award',
    title: 'SKOCH Silver — Solar Water Kiosk',
    summary:
      'Silver Category in Power & Energy for decentralised and off-grid solar water kiosk solutions.',
    date: 'September 2026',
    image: demoStar,
  },
  {
    id: 'nsefi-re-excellence',
    kind: 'Recognition',
    title: 'NSEFI RE Excellence Recognition',
    summary:
      'Recognised among state agencies contributing to India’s renewable-energy progress and sector excellence.',
    date: 'August 2024',
    image: demoMedal,
  },
  {
    id: 'solar-quarter-2020',
    kind: 'Accolade',
    title: 'Solar Quarter Sector Accolade',
    summary:
      'Sector recognition reflecting OREDA’s role in advancing renewable-energy programmes in Odisha.',
    date: 'March 2020',
    image: demoCrystal,
  },
]
