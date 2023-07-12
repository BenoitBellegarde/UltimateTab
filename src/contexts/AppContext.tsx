import { useToast } from '@chakra-ui/react'
import {
  useState,
  createContext,
  MouseEventHandler,
  SetStateAction,
  Dispatch,
} from 'react'
import useDebounce from '../hooks/useDebounce'
import useLocalStorage from '../hooks/useLocalStorage'
import useSpotifyPlaylists from '../hooks/useSpotifyPlaylists'
import useSpotifyTracks from '../hooks/useSpotifyTracks'
import useTabs from '../hooks/useTabs'
import { Tab } from '../types/tabs'

interface AppState {
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  debounedSearchValue: string
  searchType: string
  setSearchType: Dispatch<SetStateAction<string>>
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  favorites: Tab[]
  setFavorites: Dispatch<SetStateAction<Tab[]>>
  selectedTab: Tab
  setSelectedTab: Dispatch<SetStateAction<Tab>>
  isLoadingTab: boolean
  selectedTabContent: Tab
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
  favoriteActive: boolean
  setFavoriteActive: Dispatch<SetStateAction<boolean>>
  spotifyPlaylists : Object[]
  refetchSpotifyPlaylists : any
  playlistsActive: boolean
  setPlaylistsActive: Dispatch<SetStateAction<boolean>>
  spotifyTracks : Object[]
  selectedPlaylist : string
  setSelectedPlaylist : Dispatch<SetStateAction<string>>

}
export const AppStateContext = createContext<AppState | null>(null)

export function AppStateProvider({ children }) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debounedSearchValue = useDebounce<string>(searchValue, 300)
  const [searchType, setSearchType] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [favorites, setFavorites] = useLocalStorage<Tab[]>('favoriteTabs', [])
  const [favoriteActive, setFavoriteActive] = useState<boolean>(false)
  const [playlistsActive, setPlaylistsActive] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<Tab>({
    url: '',
    slug: '',
    name: '',
    artist: '',
    numberRates: 0,
    rating: 0,
    type: 'Tab',
  })
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('')


  const toast = useToast()

  const { isLoading: isLoadingTab, data: selectedTabContent } = useTabs(
    selectedTab.url,
  )

  const { isLoading: isLoadingTracks, data: spotifyTracks } = useSpotifyTracks(
    selectedPlaylist,
  )

  const { isLoading: isLoadingPlaylists, data: spotifyPlaylists, refetch : refetchSpotifyPlaylists } = useSpotifyPlaylists()

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
      duration: 2000,
    })
  }

  return (
    <AppStateContext.Provider
      value={{
        searchValue,
        setSearchValue,
        debounedSearchValue,
        searchType,
        setSearchType,
        currentPage,
        setCurrentPage,
        favorites,
        setFavorites,
        selectedTab,
        setSelectedTab,
        isLoadingTab,
        selectedTabContent,
        handleClickFavorite,
        favoriteActive,
        setFavoriteActive,
        spotifyPlaylists,
        refetchSpotifyPlaylists,
        playlistsActive,
        setPlaylistsActive,
        spotifyTracks,
        selectedPlaylist,
        setSelectedPlaylist
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
