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
import { RiEmotionSadLine } from 'react-icons/ri'
import { TAB_TYPES, TAB_TYPES_COLORS } from '../constants'
import { SearchPanelProps } from '../types/tabs'
import Pagination from './Pagination'
import RadioCard from './RadioCard'

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
}: SearchPanelProps) {
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'tabType',
    defaultValue: type,
    onChange: (value) => handleChangeType(value),
  })

  const group = getRootProps()

  return (
    <GridItem
      p="5"
      overflowY={'auto'}
      borderRightStyle={'solid'}
      borderRightWidth="1px"
      borderRightColor={borderLightColor}
      area={'nav'}
    >
      <Flex wrap={'wrap'} justifyContent="center">
        {showSearchInput && (
          <Stack mb="5" spacing={4} w="100%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>

              <Input
                onChange={(e) => handleChangeValue(e.target.value)}
                placeholder="Search a song or artist... (e.g. Slash, Wish you were here,...)"
                size={'md'}
                borderRadius="full"
              />
            </InputGroup>
          </Stack>
        )}
        <Flex>
          <HStack flexWrap={'wrap'} justifyContent="center" {...group}>
            {Object.keys(TAB_TYPES).map((value) => {
              const radio = getRadioProps({ value })
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              )
            })}
          </HStack>
        </Flex>
      </Flex>
      <Flex mt="5" wrap={'wrap'} justifyContent="center">
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
              onClick={(e) => handleClickTab(tab)}
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
                </Text>{' '}
                {tab.name}
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
