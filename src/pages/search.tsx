import {
  Button,
  Flex,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useRadioGroup,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../hooks/useTabsList'
import TabPanel from '../components/TabPanel'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { Tab } from '../types/tabs'
import { TAB_TYPES } from '../constants'
import RadioCard from '../components/RadioCard'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Search(): JSX.Element {
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

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'tabType',
    defaultValue: searchType,
    onChange: (value) => setSearchType(value),
  })

  const group = getRootProps()

  useEffect(() => {
    setCurrentPage(1)
  }, [debounedSearchValue, searchType, setCurrentPage])

  return (
    <>
      <Head>
        <title>Search - Ultimate Tab</title>
      </Head>
      <Flex>
        <HStack
          py={3}
          px={4}
          w="100%"
          shadow={'sm'}
          flexWrap={'wrap'}
          justifyContent="space-between"
          {...group}
        >
          
          <HStack>
          {Object.keys(TAB_TYPES).map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
          </HStack>
          <HStack marginInlineStart={'0 !important'}>
          <Menu>
            <MenuButton as={Button} fontSize={"sm"} rightIcon={<ChevronDownIcon />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button}  fontSize={"sm"} rightIcon={<ChevronDownIcon />}>
              Rating
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          </HStack>
        </HStack>
      </Flex>
      {/* <Grid {...gridProps}> */}
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

      {/* <TabPanel
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
