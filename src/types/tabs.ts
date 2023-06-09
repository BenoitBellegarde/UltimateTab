export interface ApiArgsSearch {
  q: string
  type?: string | string[]
  page?: number
  value?: string
  search_type?: string
  order?: string
}

export interface ApiRequestSearch {
  url: string
  type: string
  args: ApiArgsSearch
}

export interface ApiResponseSearch {
  results: Tab[]
  pagination: Pagination
}

export interface ApiRequestTab {
  url: string
}

export interface ApiResponseTab {
  tab: Tab
  spotify_access_token: SpotifyAccessToken
}

export interface Pagination {
  current: number
  total: number
}

export interface Tab {
  url: string
  slug: string
  name: string
  artist: string
  numberRates: number
  rating: number
  type: string
  difficulty?: string
  tuning?: string[]
  raw_tabs?: string
  htmlTab?: string
  versions?: Tab[]
}

export interface TabScrapped {
  marketing_type: string
  tab_url: string
  artist_name: string
  song_name: string
  rating: number
  votes: number
  type: string
  difficulty?: string
  tuning?: string[]
  raw_tabs?: string
  htmlTab?: string
}

export type TabTypes = 'All' | 'Video' | 'Tab' | 'Chords' | 'Bass' | 'Ukulele'

export type SpotifyAccessToken = string | boolean

export interface SpotifyAuthResponse {
  access_token: SpotifyAccessToken
}
