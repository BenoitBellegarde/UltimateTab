import { SearchIcon, StarIcon } from '@chakra-ui/icons'
import {
  GridItem,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  Skeleton,
  LinkBox,
  LinkOverlay,
  Badge,
  Box,
  useColorModeValue,
  useRadioGroup,
  Text,
  Icon,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { RiEmotionSadLine } from 'react-icons/ri'
import { TAB_TYPES, TAB_TYPES_COLORS } from '../constants'
import { ApiResponseSearch } from '../types/tabs'
import Pagination from './Pagination'
import RadioCard from './RadioCard'

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
}

export default function SearchPanel({
  handleChangeType,
  type,
  handleChangeValue,
  handleClickTab,
  isLoading,
  isError,
  data,
  selectedTab,
  searchValue,
  showSearchInput = true,
  handleChangePage,
}: SearchPanelProps): JSX.Element {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const router = useRouter()

  return (
    <GridItem
      px="5"
      py={4}
      overflowY={'auto'}
      // borderRightStyle={'solid'}
      // borderRightWidth="1px"
      // borderRightColor={borderLightColor}
      area={'nav'}
    >
      {/* <Flex wrap={'wrap'} justifyContent="center">
        {showSearchInput && (
          <Stack mb="5" spacing={4} w="100%">
            { <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>

              <Input
                onChange={(e) => handleChangeValue(e.target.value)}
                placeholder="Search a song or an artist..."
                size={'md'}
                borderRadius="full"
              />
            </InputGroup> }
          </Stack>
        )}
        
      </Flex> */}
      <Flex wrap={'wrap'} justifyContent="center">
        {isError && (
          <Box color={'red'}>Erreur lors de la récupération des données</Box>
        )}
        {((searchValue && showSearchInput) || !showSearchInput) &&
          !isLoading &&
          data?.results?.length === 0 && (
            <Box textAlign="center" py={10} px={6}>
              <Icon as={RiEmotionSadLine} boxSize={20} color={'gray.400'} />
              <Text color={'gray.500'}>No results found</Text>
            </Box>
          )}
        {isLoading ? (
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
              onClick={(e) => {
                router.push(`/tab/${tab.slug}`)
                //handleClickTab(tab)
              }}
              as="div"
              p="5"
              my="2"
              cursor={'pointer'}
              width={'100%'}
              borderWidth="1px"
              rounded="md"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems="center"
              boxShadow="base"
              bg={selectedTab.url === tab.url && 'twitter.400'}
              color={selectedTab.url === tab.url && 'white'}
              _hover={selectedTab.url !== tab.url && { bg: 'twitter.200' }}
              transition="background-color 0.2s ease 0s"
            >
              <LinkOverlay>
                <Text fontSize={'lg'} as="b">
                  {tab.artist}
                </Text>
                <br /> {tab.name}
              </LinkOverlay>
              <Box display={'flex'} alignItems={'center'}>
                {tab.type && TAB_TYPES_COLORS[tab.type] && (
                  <Badge mr={2} colorScheme={TAB_TYPES_COLORS[tab.type]}>
                    {tab.type}
                  </Badge>
                )}
                <StarIcon color={'yellow.400'} mr={'5px'} /> {tab.rating} (
                {tab.numberRates})
              </Box>
            </LinkBox>
          ))
        )}
        {data?.results?.length > 0 && handleChangePage && !isLoading && (
          <Pagination
            currentPage={data.pagination?.current}
            totalPageCount={data.pagination?.total}
            onPageChange={(page) => handleChangePage(page)}
          />
        )}
      </Flex>
    </GridItem>
  )
}
