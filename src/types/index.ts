export interface NavLink {
  label: string
  to?: string
  external?: boolean
  hasDropdown?: boolean
  children?: { label: string; to: string }[]
}

export interface Official {
  name: string
  title: string
  image: string
}

export interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
}
