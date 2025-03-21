import { useToast } from '@chakra-ui/react'
import {
  useState,
  createContext,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
} from 'react'
import { TAB_SOURCES } from '../constants'
import useBackgroundTabs from '../hooks/useBackgroundTabs'
import useWindowSize from '../hooks/useWindowSize'
import useLocalStorage from '../hooks/useLocalStorage'
import useTabs from '../hooks/useTabs'
import useTabsList from '../hooks/useTabsList'
import { ApiResponseSearch, Tab } from '../types/tabs'

interface AppState {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  searchType: string
  setSearchType: Dispatch<SetStateAction<string>>
  searchSource: string
  setSearchSource: Dispatch<SetStateAction<string>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  favorites: Tab[]
  setFavorites: Dispatch<SetStateAction<Tab[]>>
  selectedTab: Tab
  setSelectedTab: Dispatch<SetStateAction<Tab>>
  tabFontSize: number
  setTabFontSize: Dispatch<SetStateAction<number>>
  isLoadingTab: boolean
  widthBrowser: number
  selectedTabContent: Tab
  isLoadingTabBackground: boolean
  selectedTabContentBackground: Tab
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
  favoriteActive: boolean
  setFavoriteActive: Dispatch<SetStateAction<boolean>>
  refetchTab: Function
  isLoadingTabList: boolean
  isErrorTabList: boolean
  dataTabList: ApiResponseSearch
}
export const AppStateContext = createContext<AppState | null>(null)

export function AppStateProvider({ children }) {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchType, setSearchType] = useState<string>('All')
  const [searchSource, setSearchSource] = useState<string>(
    Object.values(TAB_SOURCES).join(','),
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [favorites, setFavorites] = useLocalStorage<Tab[]>('favoriteTabs', [])
  const [favoriteActive, setFavoriteActive] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<Tab>({
    url: '',
    slug: '',
    name: '',
    artist: '',
    numberRates: 0,
    rating: 0,
    type: 'Tab',
  })
  const [tabFontSize, setTabFontSize] = useLocalStorage<number>(
    'tabFontSize',
    100,
  )
  const [widthBrowser, heightBrowser] = useWindowSize()

  const toast = useToast()
  const {
    isLoading: isLoadingTab,
    data: selectedTabContent,
    refetch: refetchTab,
  } = useTabs(selectedTab.url, tabFontSize, widthBrowser)

  const {
    isLoading: isLoadingTabBackground,
    data: selectedTabContentBackground,
  } = useBackgroundTabs(selectedTab.url, tabFontSize, widthBrowser)

  const {
    isLoading: isLoadingTabList,
    isError: isErrorTabList,
    data: dataTabList,
  } = useTabsList(
    searchValue,
    searchType,
    currentPage,
    searchSource,
    favoriteActive,
  )

  const handleClickFavorite: MouseEventHandler<HTMLButtonElement> = () => {
    const indexEntry = favorites.findIndex((el) => el.url === selectedTab.url)
    let newFavorites = favorites
    let isAdded: boolean
    if (indexEntry !== -1) {
      newFavorites.splice(indexEntry, 1)
      isAdded = false
    } else {
      newFavorites.push(selectedTabContent)
      isAdded = true
    }
    setFavorites([...newFavorites])
    toast({
      description: isAdded
        ? 'Song added to your favorites'
        : 'Song removed from your favorites',
      status: isAdded ? 'success' : 'info',
      position: 'top-right',
      duration: 2000,
    })
  }

  return (
    <AppStateContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchType,
        setSearchType,
        searchSource,
        setSearchSource,
        currentPage,
        setCurrentPage,
        favorites,
        setFavorites,
        selectedTab,
        setSelectedTab,
        tabFontSize,
        setTabFontSize,
        isLoadingTab,
        selectedTabContent,
        isLoadingTabBackground,
        widthBrowser,
        selectedTabContentBackground,
        handleClickFavorite,
        favoriteActive,
        setFavoriteActive,
        refetchTab,
        isLoadingTabList,
        isErrorTabList,
        dataTabList,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
