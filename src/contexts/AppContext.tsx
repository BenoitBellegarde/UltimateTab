import { useToast } from '@chakra-ui/react'
import { useState, createContext, MouseEventHandler } from 'react'
import useDebounce from '../hooks/useDebounce'
import useGridProps from '../hooks/useGridProps'
import useLocalStorage from '../hooks/useLocalStorage'
import useTabs from '../hooks/useTabs'
import { Tab } from '../types/tabs'

export const AppStateContext = createContext(null)

export function AppStateProvider({ children }) {
  const [searchValue, setSearchValue] = useState<string>('')
  const debounedSearchValue = useDebounce<string>(searchValue, 300)
  const [searchType, setSearchType] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [favorites, setFavorites] = useLocalStorage<Tab[]>('favoriteTabs', [])
  const [selectedTab, setSelectedTab] = useState<Tab>({
    url: '',
    slug : '',
    name: '',
    artist: '',
    numberRates: 0,
    rating: 0,
    type: 'Tab',
  })

  const toast = useToast()

  const gridProps = useGridProps()

  const { isLoading: isLoadingTab, data: selectedTabContent } = useTabs(
    selectedTab.url,
  )

  const handleClickFavorite: MouseEventHandler<HTMLButtonElement> = () => {
    const indexEntry = favorites.findIndex((el) => el.url === selectedTab.url)
    let newFavorites = favorites
    let isAdded: Boolean
    if (indexEntry !== -1) {
      newFavorites.splice(indexEntry, 1)
      isAdded = false
    } else {
      newFavorites.push(selectedTab)
      isAdded = true
    }
    setFavorites([...newFavorites])
    toast({
      description: isAdded
        ? 'Song added to your favorite'
        : 'Song removed from your favorite',
      status: isAdded ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
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
        toast,
        gridProps,
        isLoadingTab,
        selectedTabContent,
        handleClickFavorite,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
