export interface ApiArgsSearch {
  q: string
  type?: string | Array<string>
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
  results: Array<Tab>
  pagination: {
    current: number
    total: number
  }
}

export interface ApiArgsTab {
  url: string
}
export interface ApiRequestTab {
  url: string
  args: ApiArgsTab
}

export interface Tab {
  url: string
  name: string
  artist: string
  numberRates: number
  rating: number
  type: string
}
