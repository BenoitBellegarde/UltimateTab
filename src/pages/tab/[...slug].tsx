import { useEffect } from 'react'
import TabPanel from '../../components/TabPanel'
import Head from 'next/head'
import useAppStateContext from '../../hooks/useAppStateContext'
import { Tab } from '../../types/tabs'
import { useRouter } from 'next/router'
import { Fade } from '@chakra-ui/react'

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

  const title = selectedTabContent
    ? `${selectedTabContent.name} by ${selectedTabContent.artist} - Ultimate Tab`
    : 'Tab - Ultimate Tab'
  

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
          {title}
        </title>
      </Head>
      <Fade
        style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}
        in={true}
      >
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
      </Fade>
    </>
  )
}
