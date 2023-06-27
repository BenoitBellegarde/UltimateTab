import { Grid } from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../../hooks/useTabsList'
import TabPanel from '../../components/TabPanel'
import SearchPanel from '../../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../../hooks/useAppStateContext'
import { Tab } from '../../types/tabs'
import { useRouter } from 'next/router'
import { getDatasTab } from '../../hooks/useTabs'

export default function TabPage(): JSX.Element {
  const router = useRouter()
  const slug  = Array.isArray(router.query.slug) ? router.query.slug.join('/') : router.query.slug
  
  
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
  console.log(selectedTabContent)

  const { isLoading, isError, data } = useTabsList(
    debounedSearchValue,
    searchType,
    currentPage,
  )

  useEffect(() => {
    if(slug){
      setSelectedTab(prevState => ({
            ...prevState,
            url : `https://tabs.ultimate-guitar.com/tab/${slug}`
        }))
    }
  }, [slug,setSelectedTab])

//   setSelectedTab(prevState => ({
//     ...prevState,
//     url : `https://tabs.ultimate-guitar.com/tab/${slug}`
// }))

  return (
    <>
      <Head>
        <title>{selectedTabContent ? `${selectedTabContent.tab.song_name} by ${selectedTabContent.tab.artist}` : 'Tab'} - Ultimate Tab</title>
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
