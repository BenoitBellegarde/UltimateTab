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
} from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../hooks/useTabsList'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { TAB_TYPES } from '../constants'
import RadioCard from '../components/RadioCard'
import { RiHeartFill } from 'react-icons/ri'
import useFavoriteTabs from '../hooks/useTabsFavorites'

export default function Search(): JSX.Element {
  const {
    searchValue,
    setSearchValue,
    debounedSearchValue,
    searchType,
    setSearchType,
    currentPage,
    setCurrentPage,
    selectedTab,
    setSelectedTab,
    favorites,
    favoriteActive,
    setFavoriteActive,
  } = useAppStateContext()
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const sizeImg = useBreakpointValue({
    base: '100%',
    sm: '50%',
    md: '40%',
    lg: '30%',
  })

  const { isLoading, isError, data } = useTabsList(
    debounedSearchValue,
    searchType,
    currentPage,
  )

  const { data: dataFavorites } = useFavoriteTabs(
    favorites,
    debounedSearchValue,
    searchType,
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
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                )
              })}
            </HStack>
            <HStack marginInlineStart={'0 !important'} py={3}>
              <Button
                variant="outline"
                _hover={{
                  bg: 'twitter.400',
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
        {searchValue.trim() !== '' ? (
          <SearchPanel
            handleChangeType={setSearchType}
            searchValue={searchValue}
            type={searchType}
            handleChangeValue={setSearchValue}
            handleClickTab={setSelectedTab}
            isLoading={isLoading}
            isError={isError}
            data={favoriteActive ? dataFavorites : data}
            selectedTab={selectedTab}
            handleChangePage={setCurrentPage}
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
