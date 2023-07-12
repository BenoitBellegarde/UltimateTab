import { ArrowLeftIcon, StarIcon } from '@chakra-ui/icons'
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
  Button,
  Image,
  IconButton,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RiEmotionSadLine } from 'react-icons/ri'
import { TAB_TYPES_COLORS } from '../constants'
import { ApiResponseSearch, SpotifyPlaylist, SpotifyTrack } from '../types/tabs'
import Pagination from './Pagination'
import SpotifyPlaylistCard from './SpotifyPlaylistCard'
import SpotifyTrackCard from './SpotifyTrackCard'

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
  spotifyPlaylists: SpotifyPlaylist[]
  playlistsActive: boolean
  setSelectedPlaylist: Function
  selectedPlaylist: SpotifyPlaylist
  spotifyTracks: SpotifyTrack[]
  selectedTrack: SpotifyTrack
  setSelectedTrack: Function
}

export default function SearchPanel({
  isLoading,
  isError,
  data,
  searchValue,
  showSearchInput = true,
  handleChangePage,
  handleChangeValue,
  favoriteActive,
  spotifyPlaylists,
  playlistsActive,
  selectedPlaylist,
  setSelectedPlaylist,
  spotifyTracks,
  selectedTrack,
  setSelectedTrack,
}: SearchPanelProps): JSX.Element {
  const { data: session } = useSession()
  const hexColors = useToken(
    'colors',
    Object.values(TAB_TYPES_COLORS).map((color) => color + '.300'),
  )
  console.log(spotifyTracks)
  const router = useRouter()
  const widthResult = useBreakpointValue({ base: '100%', md: 'sm' })

  return (
    <Box px="2" py={3} overflowY={'auto'}>
      <Flex wrap={'wrap'} justifyContent="center">
        {session &&
          playlistsActive &&
          spotifyPlaylists &&
          (spotifyTracks ? (
            <>
              {selectedTrack && searchValue ? (
                <Flex p="2" alignItems={'center'} w={'100%'}>
                  <Flex
                    className="tab-result"
                    as="div"
                    py={5}
                    px={3}
                    my={2}
                    mx={0}
                    width={widthResult}
                    borderWidth="0px"
                    rounded="md"
                    display={'flex'}
                    flexGrow={'1'}
                    justifyContent={'space-between'}
                    alignItems="center"
                    boxShadow="md"
                  >
                    <Flex alignItems={'center'}>
                      <IconButton
                        icon={<ArrowLeftIcon />}
                        onClick={() => {
                          handleChangeValue('')
                          setSelectedTrack(null)
                        }}
                        title="Back to tracks"
                        aria-label="Back to tracks"
                        mr={4}
                      />
                      <Image
                        objectFit="cover"
                        w={'50px'}
                        h={'50px'}
                        src={selectedTrack.album?.images[0]?.url}
                        alt="Caffe Latte"
                        mr={2}
                      />{' '}
                      <Box>
                        <Text fontSize={'lg'} as="b">
                          {selectedTrack?.name}
                        </Text>
                        <br /> {selectedTrack?.artists[0].name}
                      </Box>
                    </Flex>
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      whiteSpace={'pre'}
                      ml={2}
                    >
                      <Badge mr={2}>{selectedTrack?.duration_ms}</Badge>
                    </Box>
                  </Flex>
                </Flex>
              ) : (
                <>
                  <Flex p="2" alignItems={'center'} w={'100%'}>
                    <Flex
                      className="tab-result"
                      as="div"
                      py={5}
                      px={3}
                      my={2}
                      mx={0}
                      width={widthResult}
                      borderWidth="0px"
                      rounded="md"
                      display={'flex'}
                      flexGrow={'1'}
                      justifyContent={'space-between'}
                      alignItems="center"
                      boxShadow="md"
                    >
                      <Flex alignItems={'center'}>
                        <IconButton
                          icon={<ArrowLeftIcon />}
                          onClick={() => setSelectedPlaylist(null)}
                          title="Back to playlists"
                          aria-label="Back to playlists"
                          mr={4}
                        />
                        <Image
                          objectFit="cover"
                          w={'50px'}
                          h={'50px'}
                          src={selectedPlaylist?.images[0]?.url}
                          alt="Caffe Latte"
                          mr={2}
                        />{' '}
                        <Box>
                          <Text fontSize={'lg'} as="b">
                            {selectedPlaylist?.name}
                          </Text>
                          <br /> {selectedPlaylist?.owner.display_name}
                        </Box>
                      </Flex>
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        whiteSpace={'pre'}
                        ml={2}
                      >
                        <Badge mr={2}>
                          {selectedPlaylist?.tracks.total} tracks
                        </Badge>
                      </Box>
                    </Flex>
                  </Flex>
                  {spotifyTracks.map((track) => (
                    <SpotifyTrackCard
                      key={track.id}
                      handleClick={(track: SpotifyTrack) => {
                        setSelectedTrack(track)
                        handleChangeValue(
                          `${track.artists[0].name} ${track.name}`,
                        )
                      }}
                      track={track}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {spotifyPlaylists.map((playlist) => (
                <SpotifyPlaylistCard
                  key={playlist.id}
                  handleClick={setSelectedPlaylist}
                  playlist={playlist}
                />
              ))}
            </>
          ))}
        {isError && (
          <Box color={'red'}>Erreur lors de la récupération des données</Box>
        )}
        {((searchValue && showSearchInput) || !showSearchInput) &&
          ((!isLoading && !favoriteActive) || favoriteActive) &&
          data?.results?.length === 0 && (
            <Box textAlign="center" py={10} px={6}>
              <Icon as={RiEmotionSadLine} boxSize={20} color={'gray.400'} />
              <Text color={'gray.500'}>No results found</Text>
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
                <Text fontSize={'lg'} as="b">
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
                    {tab.type}
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
            onPageChange={(page) => handleChangePage(page)}
          />
        </Flex>
      )}
    </Box>
  )
}
