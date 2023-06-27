import { Grid } from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../hooks/useTabsList'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { Tab } from '../types/tabs'

export default function Home(): JSX.Element {
  const {
    searchValue,
    setSearchValue,
    debounedSearchValue,
    searchType,
    setSearchType,
    currentPage,
    setCurrentPage,
    favorites,
    selectedTab,
    setSelectedTab,
    gridProps,
    isLoadingTab,
    selectedTabContent,
    handleClickFavorite,
  } = useAppStateContext()

  const { isLoading, isError, data } = useTabsList(
    debounedSearchValue,
    searchType,
    currentPage,
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [debounedSearchValue, searchType, setCurrentPage])

  return (
    <>
      <Head>
        <title>Tab - Ultimate Tab</title>
      </Head>
        <TabPanel
          isLoading={isLoadingTab}
          selectedTab={selectedTab}
          selectedTabContent={selectedTabContent}
          isFavorite={
            typeof favorites.find((el: Tab) => el.url === selectedTab.url) !==
            'undefined'
          }
          handleClickFavorite={handleClickFavorite}
        />
      
    </>
  )
}