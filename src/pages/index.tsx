import { Grid, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { Tab } from '../types/tabs'
import useTabsList from '../hooks/useTabsList'
import useTabs from '../hooks/useTabs'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useGridProps from '../hooks/useGridProps'

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('')
  const debounedSearchValue = useDebounce(searchValue, 300)
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

  const gridProps = useGridProps()

  const { isLoading, isError, data } = useTabsList(
    debounedSearchValue,
    searchType,
  )

  const { isLoading: isLoadingTab, data: selectedTabContent } = useTabs(
    selectedTab.url,
  )
  useEffect(() => {
    const favoritesFetched = JSON.parse(localStorage.getItem('favoriteTabs'))
    if (favoritesFetched) {
      setFavorites(favoritesFetched)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteTabs', JSON.stringify(favorites))
  }, [favorites])

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
    <>
      <Head>
        <title>Ultimate Tab</title>
      </Head>
      <Grid {...gridProps}>
        <SearchPanel
          handleChangeType={setSearchType}
          searchValue={searchValue}
          type={searchType}
          handleChangeValue={setSearchValue}
          handleClickTab={setSelectedTab}
          isLoading={isLoading}
          isError={isError}
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
    </>
  )
}
