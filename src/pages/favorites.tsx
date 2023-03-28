import { Grid, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Tab } from '../types/tabs'
import useTabs from '../hooks/useTabs'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import { tabTypes } from '../constants'

export default function Favorites() {
  const [searchType, setSearchType] = useState<string>('All')
  const [favorites, setFavorites] = useState<Array<any>>([])
  const [selectedTab, setSelectedTab] = useState<Tab | undefined>({
    url: '',
    name: '',
    artist: '',
    numberRates: 0,
    rating: '',
  })

  const toast = useToast()

  useEffect(() => {
    const favoritesFetched = JSON.parse(localStorage.getItem('favoriteTabs'))
    if (favoritesFetched) {
      setFavorites(favoritesFetched)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteTabs', JSON.stringify(favorites))
  }, [favorites])

  const data =  searchType === 'All' ? favorites : favorites.filter(el => el.type === tabTypes[searchType])


  const { isLoading: isLoadingTab, data: selectedTabContent } = useTabs(
    selectedTab.url,
  )

  const handleClickFavorite = () => {
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
      // title: 'Account created.',
      description: isAdded
        ? 'Song added to your favorite'
        : 'Song removed from your favorite',
      status: isAdded ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
      <Grid
        templateAreas={`
                  "nav header"
                  "nav main"
                  "nav footer"`}
        gridTemplateRows={'80px 1fr 60px'}
        gridTemplateColumns={'1fr 2fr'}
        h="calc(100vh - 4rem)"
        gap="1"
      >
        <SearchPanel
          handleChangeType={setSearchType}
          type={searchType}
          showSearchInput={false}
          handleClickTab={setSelectedTab}
          isLoading={false}
          isError={false}
          data={data}
          selectedTab={selectedTab}
        />

        <TabPanel
          isLoading={isLoadingTab}
          selectedTab={selectedTab}
          selectedTabContent={selectedTabContent}
          isFavorite={favorites.find((el) => el.url === selectedTab.url)}
          handleClickFavorite={handleClickFavorite}
        />
      </Grid>
  )
}
