import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useRadioGroup,
  Fade,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { TAB_SOURCES, TAB_TYPES } from '../constants'
import RadioCard from '../components/RadioCard'
import { RiHeartFill } from 'react-icons/ri'
import { MdFilterList } from 'react-icons/md'
import useFavoriteTabs from '../hooks/useTabsFavorites'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { getSearchObjectParameters } from '../lib/utils/params'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Search(): JSX.Element {
  const {
    searchValue,
    setSearchValue,
    searchType,
    setSearchType,
    searchSource,
    setSearchSource,
    setCurrentPage,
    selectedTab,
    setSelectedTab,
    favorites,
    favoriteActive,
    setFavoriteActive,
    isLoadingTabList,
    isErrorTabList,
    dataTabList,
  } = useAppStateContext()

  const searchParams = useSearchParams()
  const router = useRouter()

  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const sizeImg = useBreakpointValue({
    base: '100%',
    sm: '50%',
    md: '40%',
    lg: '30%',
  })

  const { data: dataFavorites } = useFavoriteTabs(
    favorites,
    searchValue,
    searchType,
    searchSource,
  )

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'tabType',
    defaultValue: searchType,
    onChange: (value) =>
      router.push({
        pathname: `/search`,
        query: getSearchObjectParameters(searchParams, {
          type: value,
          page: 1,
        }),
      }),
  })

  const group = getRootProps()

  useEffect(() => {
    if (searchParams) {
      searchParams.forEach((value, key) => {
        switch (key) {
          case 'q':
            setSearchValue(value)
            break
          case 'type':
            setSearchType(value)
            break
          case 'page':
            setCurrentPage(parseInt(value))
            break
          case 'source':
            setSearchSource(value)
            break
        }
      })
    }
  }, [
    searchParams,
    setSearchValue,
    setSearchType,
    setCurrentPage,
    setSearchSource,
  ])

  return (
    <>
      <Head>
        <title>Search - Ultimate Tab</title>
      </Head>
      <Fade
        style={{ display: 'flex', flexGrow: '1', flexDirection: 'column' }}
        in={true}
      >
        <Flex>
          <HStack
            mx={4}
            pb={2}
            w="100%"
            borderBottomStyle={'solid'}
            borderBottomWidth={'1px'}
            borderBottomColor={borderLightColor}
            flexWrap={'wrap'}
            justifyContent="space-between"
            {...group}
          >
            <HStack>
              {Object.keys(TAB_TYPES).map((value) => {
                const radio = getRadioProps({ value })
                radio.isChecked = searchType == value ? true : false
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                )
              })}
            </HStack>
            <HStack marginInlineStart={'0 !important'} py={3}>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  variant="outline"
                  _hover={{
                    bg: 'blue.400',
                    color: 'white',
                  }}
                  _active={{
                    bg: 'blue.600',
                    color: 'white',
                  }}
                  size={'sm'}
                  boxShadow="md"
                  fontWeight={'normal'}
                  px="3"
                  py="4"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={
                    <Icon
                      fontSize={'sm'}
                      color={useColorModeValue('gray.700', 'gray.200')}
                      position="relative"
                      top="-0.05rem"
                      as={MdFilterList}
                    />
                  }
                >
                  Filters
                </MenuButton>
                <MenuList minWidth="240px">
                  <MenuOptionGroup
                    title="Search by"
                    type="checkbox"
                    onChange={(searchSourceValues: string[]) => {
                      router.push({
                        pathname: `/search`,
                        query: getSearchObjectParameters(searchParams, {
                          page: 1,
                          source:
                            searchSourceValues.length > 0
                              ? searchSourceValues.join(',')
                              : Object.values(TAB_SOURCES)
                                  .filter((value) => value !== searchSource)
                                  .join(','),
                        }),
                      })
                    }}
                    value={searchSource.split(',')}
                  >
                    {Object.keys(TAB_SOURCES).map((key) => (
                      <MenuItemOption
                        key={TAB_SOURCES[key]}
                        value={TAB_SOURCES[key]}
                      >
                        {key}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Button
                variant="outline"
                _hover={{
                  bg: 'blue.400',
                  color: 'white',
                  opacity: favoriteActive ? 0.8 : 1,
                }}
                _active={{
                  bg: 'fadebp',
                  color: 'white',
                }}
                isActive={favoriteActive}
                onClick={() =>
                  setFavoriteActive((prevState: boolean) => !prevState)
                }
                size={'sm'}
                boxShadow="md"
                fontWeight={'normal'}
                px="3"
                py="4"
                leftIcon={<Icon color="red.200" as={RiHeartFill} />}
              >
                Favorites
              </Button>
            </HStack>
          </HStack>
        </Flex>
        {(!favoriteActive && searchValue.trim() !== '') || favoriteActive ? (
          <SearchPanel
            handleChangeType={setSearchType}
            searchValue={searchValue}
            type={searchType}
            handleChangeValue={setSearchValue}
            handleClickTab={setSelectedTab}
            isLoading={isLoadingTabList}
            isError={isErrorTabList}
            data={favoriteActive ? dataFavorites : dataTabList}
            selectedTab={selectedTab}
            handleChangePage={(page: number) =>
              router.push({
                pathname: `/search`,
                query: getSearchObjectParameters(searchParams, { page: page }),
              })
            }
            favoriteActive={favoriteActive}
          />
        ) : (
          <Flex
            px={4}
            py={6}
            flex={1}
            direction={'column'}
            align={'center'}
            justify={'start'}
          >
            <Text
              textAlign={'center'}
              fontSize={'lg'}
              color={'gray.500'}
              mb={5}
            >
              Use the search bar above to start finding tabs
            </Text>
            <Image
              alt={'Search image'}
              mt={5}
              h={sizeImg}
              w={sizeImg}
              src={'search-illustration.svg'}
            />
          </Flex>
        )}
      </Fade>
    </>
  )
}
