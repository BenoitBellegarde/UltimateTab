import {
  Flex,
  Grid,
  Text,
  Heading,
  Stack,
  useBreakpointValue,
  Button,
  Image,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../hooks/useTabsList'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { Tab } from '../types/tabs'

export default function Home(): JSX.Element {
  // const {
  //   searchValue,
  //   setSearchValue,
  //   debounedSearchValue,
  //   searchType,
  //   setSearchType,
  //   currentPage,
  //   setCurrentPage,
  //   favorites,
  //   selectedTab,
  //   setSelectedTab,
  //   gridProps,
  //   isLoadingTab,
  //   selectedTabContent,
  //   handleClickFavorite,
  // } = useAppStateContext()

  // const { isLoading, isError, data } = useTabsList(
  //   debounedSearchValue,
  //   searchType,
  //   currentPage,
  // )

  // useEffect(() => {
  //   setCurrentPage(1)
  // }, [debounedSearchValue, searchType, setCurrentPage])

  return (
    <>
      <Head>
        <title>Ultimate Tab</title>
      </Head>
      <Flex w={'100%'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                100% ads-free,
              </Text>
              <br />{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                100% responsive,
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Ultimate guitar tabs
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Browse every guitar tabs scraped from Ultimate Guitar with an enhanced, ads-free and responsive interface.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Search a tab
              </Button>
              {/* <Button rounded={'full'}>How It Works</Button> */}
            </Stack>
          </Stack>
        </Flex>
        <Flex
          p={useBreakpointValue({ base: 0, md: 8 })}
          flex={1}
          align={'center'}
          justify={'center'}
        >
          <Image
            alt={'Login Image'}
            objectFit={useBreakpointValue({ base: 'contain', md: 'cover' })}
            style={{
              aspectRatio: useBreakpointValue({ base: '16/9', md: 'initial' }),
            }}
            h={useBreakpointValue({ base: '90%', md: '50%', lg: '60%' })}
            src={'home-illustration.svg'}
          />
        </Flex>
      </Flex>
      {/* <Grid {...gridProps}>
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
          handleChangePage={setCurrentPage}
        />

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
      </Grid> */}
    </>
  )
}
