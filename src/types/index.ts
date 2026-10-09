export interface NavLink {
  label: string
  to?: string
  hasDropdown?: boolean
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
