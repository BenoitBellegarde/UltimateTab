import { AttachmentIcon, ChevronDownIcon, StarIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  ToastId,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import HTMLReactParser from 'html-react-parser'
import { GiGuitarHead } from 'react-icons/gi'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import Difficulty from './Difficulty'
import ChordDiagram from './ChordDiagram'
import { Tab } from '../types/tabs'
import {
  MouseEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useRouter } from 'next/router'
import useDebounce from '../hooks/useDebounce'
import Draggable from 'react-draggable'
import useBackingtrack from '../hooks/useBackingtrack'
import ReactPlayer from 'react-player/youtube'
import { FaPlayCircle, FaPauseCircle, FaVolumeDown } from 'react-icons/fa'

interface TabPanelProps {
  selectedTab: Tab
  isFavorite: boolean
  selectedTabContent: Tab
  isLoading: boolean
  handleClickFavorite: MouseEventHandler<HTMLButtonElement>
  refetchTab: Function
}

export default function TabPanel({
  isFavorite,
  selectedTabContent,
  isLoading,
  handleClickFavorite,
  refetchTab,
}: TabPanelProps) {
  const router = useRouter()
  const widthBrowser = useDebounce<number>(
    typeof document !== 'undefined' ? document.documentElement.clientWidth : 0,
    500,
  )
  const [showBackingTrack, setShowBackingTrack] = useState<boolean>(false)
  const [playBackingTrack, setPlayBackingTrack] = useState<boolean>(false)
  const [volumeBackingTrack, setVolumeBackingTrack] = useState<number>(0.5)
  const [durationBackingTrack, setDurationBackingTrack] = useState<number>(0)
  const [seekingBackingTrack, setSeekingBackingTrack] = useState<boolean>(false)
  const { data: urlBackingTrack } = useBackingtrack(
    `${selectedTabContent?.artist} ${selectedTabContent?.name} backing track guitar`,
    showBackingTrack,
  )
  const firstUpdate = useRef<boolean>(true)
  const refIframe = useRef<HTMLIFrameElement>(null)
  const refPlayer = useRef<ReactPlayer>(null)

  const flexSongNameDirection = useBreakpointValue({
    base:
      selectedTabContent &&
      selectedTabContent.artist?.length + selectedTabContent.name?.length > 30
        ? 'column'
        : 'row',
    sm: 'row',
  })
  const widthToolsBar = useBreakpointValue({
    base: '100%',
    sm: '50%'
  })
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const toast = useToast()
  const refToastId = useRef<ToastId>()
  const borderLightColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    refIframe
  }, [refIframe])

  // Refetch tab when resizing browser or changing orientation to get the updated responsive tab from UG
  if (typeof document !== 'undefined') {
    // Hook executed only in browser to prevent NextJS SSR to return a warning
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      if (!selectedTabContent) return
      if (refToastId.current) {
        toast.close(refToastId.current)
      }

      refToastId.current = toast({
        description: 'Adapting tab to your browser dimensions...',
        status: 'info',
        duration: null,
        isClosable: true,
      })
      refetchTab().then(() => {
        toast.close(refToastId.current)
      })
      // Disabling this effect on the first load of the tab to prevent triggering the toast only because of scrollbar appearing/disappearing
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widthBrowser, refetchTab])
  }
  return (
    <>
      <Box
        h="100%"
        px={5}
        py={2}
        borderBottomStyle={'solid'}
        borderBottomWidth={selectedTabContent && '1px'}
        borderBottomColor={borderLightColor}
      >
        <Skeleton
          justifyContent={'space-between'}
          flexDirection="column"
          display={'flex'}
          h="100%"
          isLoaded={!isLoading}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'} pb={0}>
              <Flex
                alignItems={'baseline'}
                flexDirection={flexSongNameDirection as 'row' | 'column'}
                py={1}
              >
                <Text fontSize={'lg'} as="b" mr={1}>
                  {selectedTabContent?.artist}
                </Text>{' '}
                <Text fontSize={'md'}>{selectedTabContent?.name}</Text>
              </Flex>
            </Flex>
            <Flex fontSize={'sm'} justifyContent={'start'}>
              <Tooltip
                placement="right"
                label={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <IconButton
                  icon={isFavorite ? <RiHeartFill /> : <RiHeartLine />}
                  onClick={handleClickFavorite}
                  colorScheme={isFavorite ? 'red' : 'gray'}
                  variant="ghost"
                  aria-label="Add to favorites"
                  size={'md'}
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'space-between'} py={1}>
            {
              // Hack with top and relative position to make the star icon perfectly vertically aligned
            }
            <Flex alignItems={'center'}>
              <StarIcon
                fontSize={'sm'}
                color={'yellow.400'}
                position="relative"
                top="-0.05rem"
                mr={'5px'}
              />{' '}
              <Flex>
                {selectedTabContent?.rating} ({selectedTabContent?.numberRates})
              </Flex>
            </Flex>
            {selectedTabContent?.versions.length > 0 && (
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
                  py="1"
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={
                    <Icon
                      fontSize={'sm'}
                      color={'yellow.400'}
                      position="relative"
                      top="-0.05rem"
                      as={StarIcon}
                    />
                  }
                >
                  More versions
                </MenuButton>
                <MenuList>
                  {selectedTabContent?.versions?.map((tab) => (
                    <MenuItem
                      onClick={() => {
                        router.push(`/tab/${tab.slug}`)
                      }}
                      key={tab.slug}
                    >
                      <StarIcon
                        fontSize={'sm'}
                        color={'yellow.400'}
                        position="relative"
                        top="-0.05rem"
                        mr={'5px'}
                      />{' '}
                      {tab.rating} ({tab.numberRates})
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Flex
            justifyContent={'space-between'}
            flexDirection={useBreakpointValue({ base: 'column', sm: 'row' })}
          >
            <Flex fontSize={'sm'} py={2}>
              <Text color={'gray.500'} as="b" mr={1}>
                Difficulty
              </Text>{' '}
              <Difficulty level={selectedTabContent?.difficulty} />
            </Flex>{' '}
            <Flex fontSize={'sm'} py={2}>
              <Text color={'gray.500'} as="b" mr={1}>
                Tuning
              </Text>{' '}
              <Icon boxSize={5} as={GiGuitarHead} mr={1} />
              {selectedTabContent?.tuning.join(' ')}
            </Flex>{' '}
          </Flex>
        </Skeleton>
      </Box>

      <Flex
        p={5}
        h="100%"
        w="100%"
        flexGrow={1}
        alignItems={'stretch'}
        wrap={'wrap'}
        justifyContent="center"
      >
        <Skeleton display={'flex'} w="100%" isLoaded={!isLoading}>
          <Flex h={'100%'} w="100%">
            {selectedTabContent && HTMLReactParser(selectedTabContent?.htmlTab)}
          </Flex>
        </Skeleton>
      </Flex>
      <ChordDiagram />
      <Flex
        position={'fixed'}
        width={widthToolsBar}
        left={'50%'}
        transform={'translate(-50%, 0)'}
        height={'60px'}
        bg={'whiteAlpha.50'}
        border={'1px'}
        borderColor={borderColor}
        backdropFilter={'blur(6px)'}
        shadow={'lg'}
        rounded={'full'}
        bottom={'17px'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={3}
        display={isLoading ? 'none' : 'flex'}
      >
        <Text fontSize="xs"> Backing track</Text>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <IconButton
            aria-label="Play/Pause"
            variant="outline"
            icon={playBackingTrack ? <FaPauseCircle /> : <FaPlayCircle />}
            _hover={{
              bg: 'twitter.300',
              color: 'white',
            }}
            _active={{
              bg: 'twitter.600',
              color: 'white',
            }}
            onClick={() => {
              setShowBackingTrack(true)
              setPlayBackingTrack((prevValue) => !prevValue)
            }}
            size={'sm'}
            width={'40px'}
            boxShadow="md"
            rounded={'full'}
            fontWeight={'normal'}
          />
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            style={{
              width: '100%',
            }}
            value={durationBackingTrack}
            onMouseDown={() => setSeekingBackingTrack(true)}
            onChange={(e) =>
              setDurationBackingTrack(parseFloat(e.target.value))
            }
            onMouseUp={(e) => {
              setSeekingBackingTrack(false)
              refPlayer.current.seekTo(parseFloat(e.currentTarget.value))
            }}
            onTouchStart={(e) => {
              setSeekingBackingTrack(false)
              refPlayer.current.seekTo(parseFloat(e.currentTarget.value))
            }}
          />
        </Flex>
        <Flex>
        <Icon boxSize={4} mr={1} as={FaVolumeDown}/>
        <input
          type={'range'}
          min={0}
          max={1}
          style={{
            maxWidth: '80px',
            width: '100%',
          }}
          step="any"
          value={volumeBackingTrack}
          onChange={(e) => setVolumeBackingTrack(parseFloat(e.target.value))}
        />
        </Flex>
      </Flex>

      {urlBackingTrack && showBackingTrack && (
        <ReactPlayer
          style={{ display: 'none' }}
          ref={refPlayer}
          playing={playBackingTrack}
          url={urlBackingTrack}
          volume={volumeBackingTrack}
          onProgress={(e) =>
            !seekingBackingTrack && setDurationBackingTrack(e.played)
          }
        />
      )}
    </>
  )
}
