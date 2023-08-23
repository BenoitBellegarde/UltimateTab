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
  width: string
  height: string
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
  chordsDiagrams?: UGChordDiagram[]
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

export interface UGChordDiagram {
  chordName: Array<{
    fingers: number[]
    frets: number[]
    fret: number
    listCapos: Array<{
      finger: number
      fret: number
      lastString: number
      startString: number
    }>
  }>
}

export interface AutocompleteScrapped {
  suggestions: string[]
}

export interface PuppeteerOptions {
  widthBrowser?: string
  heightBrowser?: string
  isMobile?: boolean
}

export type TabTypes = 'All' | 'Video' | 'Tab' | 'Chords' | 'Bass' | 'Ukulele'

export type SpotifyAccessToken = string | boolean

export interface SpotifyAuthResponse {
  access_token: SpotifyAccessToken
}
