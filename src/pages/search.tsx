import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  Image,
  Text,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorModeValue,
  useRadioGroup,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import useTabsList from '../hooks/useTabsList'
import SearchPanel from '../components/SearchPanel'
import Head from 'next/head'
import useAppStateContext from '../hooks/useAppStateContext'
import { TAB_TYPES } from '../constants'
import RadioCard from '../components/RadioCard'
import { ChevronDownIcon, StarIcon } from '@chakra-ui/icons'
import { MdFilterList } from 'react-icons/md'
import { RiHeartFill } from 'react-icons/ri'

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
                bg: 'twitter.300',
                color: 'white',
              }}
              _active={{
                bg: 'twitter.600',
                color: 'white',
              }}
              size={'sm'}
              boxShadow="md"
              fontWeight={'normal'}
              px="3"
              py="4"
              leftIcon={<Icon color="red.200" as={RiHeartFill} />}
            >
              Favorites
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                _hover={{
                  bg: 'twitter.300',
                  color: 'white',
                }}
                _active={{
                  bg: 'twitter.600',
                  color: 'white',
                }}
                size={'sm'}
                boxShadow="md"
                fontWeight={'normal'}
                px="3"
                py="4"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<Icon as={MdFilterList} />}
              >
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem>Relevance</MenuItem>
                <MenuItem>Highest rated</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                variant="outline"
                size={'sm'}
                _hover={{
                  bg: 'twitter.300',
                  color: 'white',
                }}
                _active={{
                  bg: 'twitter.600',
                  color: 'white',
                }}
                fontWeight={'normal'}
                boxShadow="md"
                px="3"
                py="4"
                rightIcon={<ChevronDownIcon />}
                leftIcon={<StarIcon color="yellow.400" />}
              >
                Rating
              </MenuButton>
              <MenuList>
                <MenuItem>
                  5<StarIcon color="yellow.400" ml={1} />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                </MenuItem>

                <MenuItem>
                  4<StarIcon color="yellow.400" ml={1} />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                </MenuItem>
                <MenuItem>
                  3<StarIcon color="yellow.400" ml={1} />
                  <StarIcon color="yellow.400" />
                  <StarIcon color="yellow.400" />
                </MenuItem>
                <MenuItem>
                  2<StarIcon color="yellow.400" ml={1} />
                  <StarIcon color="yellow.400" />
                </MenuItem>
              </MenuList>
            </Menu>
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
          data={data}
          selectedTab={selectedTab}
          handleChangePage={setCurrentPage}
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
          <Text textAlign={'center'} fontSize={'lg'} color={'gray.500'} mb={5}>
            Use the search bar to start finding your favorite tabs
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
    </>
  )
}
