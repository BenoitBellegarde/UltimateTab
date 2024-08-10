import { StarIcon } from '@chakra-ui/icons'
import {
  Flex,
  Skeleton,
  LinkBox,
  LinkOverlay,
  Badge,
  Box,
  useBreakpointValue,
  Text,
  Icon,
  useToken,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiEmotionSadLine } from 'react-icons/ri'
import { TAB_TYPES_COLORS } from '../constants'
import { ApiResponseSearch } from '../types/tabs'
import Pagination from './Pagination'

interface SearchPanelProps {
  handleChangeType: Function
  type: string
  handleChangeValue?: Function
  handleClickTab: Function
  isLoading: boolean
  isError: boolean
  data: ApiResponseSearch
  handleChangePage?: Function
  selectedTab: any
  searchValue?: string
  showSearchInput?: boolean
  favoriteActive: boolean
}

export default function SearchPanel({
  isLoading,
  isError,
  data,
  searchValue,
  showSearchInput = true,
  handleChangePage,
  favoriteActive,
}: SearchPanelProps): JSX.Element {
  const hexColors = useToken(
    'colors',
    Object.values(TAB_TYPES_COLORS).map((color) => color + '.300'),
  )
  const router = useRouter()
  const widthResult = useBreakpointValue({ base: '100%', md: 'sm' })
  const fontSizeHeading = useBreakpointValue({ base: 'md', md: 'lg' })
  const fontSizeContent = useBreakpointValue({ base: 'sm', md: 'md' })
  return (
    <Box px="2" py={3} overflowY={'auto'}>
      <Flex wrap={'wrap'} justifyContent="center">
        {isError && <Box color={'red'}>Fetching data error</Box>}
        {((!favoriteActive && searchValue && showSearchInput) ||
          favoriteActive) &&
          ((!isLoading && !favoriteActive) || favoriteActive) &&
          (data?.results?.length === 0 || data?.results === null) && (
            <Box textAlign="center" py={10} px={6}>
              <Icon as={RiEmotionSadLine} boxSize={20} color={'gray.400'} />
              <Text color={'gray.500'}>
                No {favoriteActive ? 'favorites' : 'results'} found
              </Text>
            </Box>
          )}
        {isLoading && !favoriteActive ? (
          <Box w="100%">
            <Skeleton rounded="md" h="70px" my={2} />
            <Skeleton rounded="md" h="70px" my={2} />
            <Skeleton rounded="md" h="70px" my={2} />
            <Skeleton rounded="md" h="70px" my={2} />
            <Skeleton rounded="md" h="70px" my={2} />
          </Box>
        ) : (
          data?.results?.map((tab, index) => (
            <LinkBox
              className="tab-result"
              key={index}
              onClick={() => {
                router.push(`/tab/${tab.slug}`)
                window.scrollTo(0, 0)
              }}
              as="div"
              p="5"
              m="2"
              cursor={'pointer'}
              width={widthResult}
              borderWidth="1px"
              rounded="md"
              display={'flex'}
              flexGrow={'1'}
              fontSize={fontSizeContent}
              justifyContent={'space-between'}
              alignItems="center"
              boxShadow="md"
              style={{
                boxShadow: `${
                  hexColors[Object.keys(TAB_TYPES_COLORS).indexOf(tab.type)]
                }5c 0px 4px 6px -1px, ${
                  hexColors[Object.keys(TAB_TYPES_COLORS).indexOf(tab.type)]
                }5c 0px 2px 4px -1px`,
              }}
              _hover={{
                bg: `${TAB_TYPES_COLORS[tab.type]}.600`,
                color: 'white',
              }}
              transition="background-color 0.2s ease 0s"
            >
              <LinkOverlay>
                <Text fontSize={fontSizeHeading} as="b">
                  {tab.artist}
                </Text>
                <br /> {tab.name}
              </LinkOverlay>
              <Box
                display={'flex'}
                alignItems={'center'}
                whiteSpace={'pre'}
                ml={2}
              >
                {tab.type && TAB_TYPES_COLORS[tab.type] && (
                  <Badge mr={2} colorScheme={TAB_TYPES_COLORS[tab.type]}>
                    {tab.type.replace('Tabs', 'Tab')}
                  </Badge>
                )}
                <StarIcon color={'yellow.400'} mr={'5px'} /> {tab.rating} (
                {tab.numberRates})
              </Box>
            </LinkBox>
          ))
        )}
      </Flex>
      {data?.results?.length > 0 && handleChangePage && !isLoading && (
        <Flex justifyContent={'center'}>
          <Pagination
            currentPage={data.pagination?.current}
            totalPageCount={data.pagination?.total}
            onPageChange={(page: number) => handleChangePage(page)}
          />
        </Flex>
      )}
    </Box>
  )
}
