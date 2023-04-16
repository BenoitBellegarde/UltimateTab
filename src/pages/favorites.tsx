import { Grid } from '@chakra-ui/react'
import Head from 'next/head'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import useFavoriteTabs from '../hooks/useTabsFavorites'
import useAppStateContext from '../hooks/useAppStateContext'
import { Tab } from '../types/tabs'

export default function Favorites(): JSX.Element {
  const {
    searchType,
    setSearchType,
    favorites,
    selectedTab,
    setSelectedTab,
    gridProps,
    isLoadingTab,
    selectedTabContent,
    handleClickFavorite,
  } = useAppStateContext()
  const { data } = useFavoriteTabs(favorites, searchType)

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
          isFavorite={
            typeof favorites.find((el : Tab) => el.url === selectedTab.url) !==
            "undefined"
          }
          handleClickFavorite={handleClickFavorite}
        />
      </Grid>
    </>
  )
}
