export interface ApiArgsSearch {
  q: string
  type?: string | Array<string>
  page?: number
  value?: string
  // to not evoke suspicion, we try to make the same request as in the ultimate guitar web application
  search_type?: string
  order?: string
}

export interface ApiRequestSearch {
  url: string
  type: string
  args: ApiArgsSearch
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
  rating: string
}

export interface SearchPanelProps {
  handleChangeType : Function
  type : string
  handleChangeValue? : Function
  handleClickTab : Function
  isLoading : boolean
  isError : boolean
  data : any
  selectedTab : any
  searchValue? : string,
  showSearchInput? : boolean
}