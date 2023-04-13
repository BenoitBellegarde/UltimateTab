import { Grid, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Tab } from '../types/tabs'
import useTabs from '../hooks/useTabs'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import { TAB_TYPES } from '../constants'
import useGridProps from '../hooks/useGridProps'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Favorites(): JSX.Element {
  const [searchType, setSearchType] = useState<string>('All')
  const [favorites, setFavorites] = useLocalStorage<any[]>(
    'favoriteTabs',
    [],
  )
  const [selectedTab, setSelectedTab] = useState<Tab | undefined>({
    url: '',
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
  const data = {
    results:
      searchType === 'All'
        ? favorites
        : favorites.filter((el) => el.type === TAB_TYPES[searchType]),
  }

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
        <title>Ultimate Tab - Favorites</title>
      </Head>
      <Grid {...gridProps}>
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
    </>
  )
}
