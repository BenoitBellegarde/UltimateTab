import { useEffect } from 'react'
import TabPanel from '../../components/TabPanel'
import Head from 'next/head'
import useAppStateContext from '../../hooks/useAppStateContext'
import { Tab } from '../../types/tabs'
import { useRouter } from 'next/router'

export default function TabPage(): JSX.Element {
  const router = useRouter()
  const slug = Array.isArray(router.query.slug)
    ? router.query.slug.join('/')
    : router.query.slug

  const {
    favorites,
    selectedTab,
    setSelectedTab,
    isLoadingTab,
    selectedTabContent,
    handleClickFavorite,
  } = useAppStateContext()

  useEffect(() => {
    if (slug) {
      setSelectedTab((prevState) => ({
        ...prevState,
        url: `https://tabs.ultimate-guitar.com/tab/${slug}`,
      }))
    }
  }, [slug, setSelectedTab])

  return (
    <>
      <Head>
        <title>
          {selectedTabContent
            ? `${selectedTabContent.tab.song_name} by ${selectedTabContent.tab.artist}`
            : 'Tab'}{' '}
          - Ultimate Tab
        </title>
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
