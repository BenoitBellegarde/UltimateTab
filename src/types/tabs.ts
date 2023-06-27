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
  tab: TabScrapped
  spotify_access_token: SpotifyAccessToken
}

export interface Pagination {
  current: number
  total: number
}

export interface Tab {
  url: string
  slug : string
  name: string
  artist: string
  numberRates: number
  rating: number
  type: string
}

export interface SearchScrapped {
  marketing_type: string
  song_name: string
  tab_url: string
  type: string
  artist_name: string
  rating: number
  votes: number
}

export interface TabScrapped {
  artist: string
  song_name: string
  tab_url: string
  difficulty: string
  tuning: string[]
  raw_tabs: string
  htmlTab: string
}

export type TabTypes = 'All' | 'Video' | 'Tab' | 'Chords' | 'Bass' | 'Ukulele'

export type SpotifyAccessToken = string | Boolean

export interface SpotifyAuthResponse {
  access_token: SpotifyAccessToken
}
