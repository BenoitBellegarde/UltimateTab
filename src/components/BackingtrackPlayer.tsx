import {
  Flex,
  IconButton,
  Spinner,
  useBreakpointValue,
  useColorModeValue,
  Text,
  Icon,
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle, FaVolumeDown } from 'react-icons/fa'
import ReactPlayer from 'react-player'
import useBackingtrack from '../hooks/useBackingtrack'
import PlayerDuration from './PlayerDuration'

interface BackingtrackPlayerProps {
  showBackingTrack: boolean
  isLoading: boolean
  setShowBackingTrack: Dispatch<SetStateAction<boolean>>
  artist: string
  songName: string
}

export default function BackingtrackPlayer({
  showBackingTrack,
  isLoading,
  setShowBackingTrack,
  artist,
  songName,
}: BackingtrackPlayerProps): JSX.Element {
  const [isLoadingBackingTrack, setIsLoadingBackingTrack] =
    useState<boolean>(true)
  const [playBackingTrack, setPlayBackingTrack] = useState<boolean>(false)
  const [volumeBackingTrack, setVolumeBackingTrack] = useState<number>(0.25)
  const [durationBackingTrack, setDurationBackingTrack] = useState<number>(0)
  const [totalDurationBackingTrack, setTotalDurationBackingTrack] =
    useState<number>(0)
  const [seekingBackingTrack, setSeekingBackingTrack] = useState<boolean>(false)
  const { data: urlBackingTrack } = useBackingtrack(
    `${artist} ${songName} backing track guitar`,
    showBackingTrack,
  )
  const refPlayer = useRef<ReactPlayer>(null)
  const widthToolsBar = useBreakpointValue({
    base: '100%',
    sm: '50%',
  })
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  return (
    <>
      {showBackingTrack && (
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
          justifyContent={isLoadingBackingTrack ? 'center' : 'space-between'}
          alignItems={'center'}
          px={3}
          display={isLoading ? 'none' : 'flex'}
        >
          {isLoadingBackingTrack ? (
            <Spinner color="blue.200" />
          ) : (
            <>
              <Text px={1} fontSize="xs">
                {' '}
                Backing track
              </Text>
              <Flex flexDirection={'column'} alignItems={'center'}>
                <IconButton
                  aria-label="Play/Pause"
                  variant="outline"
                  icon={playBackingTrack ? <FaPauseCircle /> : <FaPlayCircle />}
                  _hover={{
                    bg: 'blue.300',
                    color: 'white',
                  }}
                  _active={{
                    bg: 'blue.600',
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
                <Flex fontSize={'xs'}>
                  <PlayerDuration
                    seconds={totalDurationBackingTrack * durationBackingTrack}
                  />
                  <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    style={{
                      width: '100%',
                      margin: '0 var(--chakra-space-1)',
                    }}
                    value={durationBackingTrack}
                    onMouseDown={() => setSeekingBackingTrack(true)}
                    onTouchStart={() => setSeekingBackingTrack(true)}
                    onChange={(e) => {
                      setDurationBackingTrack(parseFloat(e.target.value))
                    }}
                    onMouseUp={(e) => {
                      setSeekingBackingTrack(false)
                      refPlayer.current.seekTo(
                        parseFloat(e.currentTarget.value),
                      )
                    }}
                    onTouchEnd={(e) => {
                      setSeekingBackingTrack(false)
                      refPlayer.current.seekTo(
                        parseFloat(e.currentTarget.value),
                      )
                    }}
                  />
                  <PlayerDuration
                    seconds={
                      totalDurationBackingTrack * (1 - durationBackingTrack)
                    }
                  />
                </Flex>
              </Flex>
              <Flex>
                <Icon boxSize={4} mr={1} as={FaVolumeDown} />
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
                  onChange={(e) =>
                    setVolumeBackingTrack(parseFloat(e.target.value))
                  }
                />
              </Flex>
            </>
          )}
        </Flex>
      )}
      {urlBackingTrack && showBackingTrack && (
        <ReactPlayer
          style={{ visibility: 'hidden', position: 'absolute' }}
          ref={refPlayer}
          playing={playBackingTrack}
          url={urlBackingTrack}
          volume={volumeBackingTrack}
          onProgress={(e) =>
            !seekingBackingTrack && setDurationBackingTrack(e.played)
          }
          onDuration={(duration) => setTotalDurationBackingTrack(duration)}
          onReady={() => setIsLoadingBackingTrack(false)}
        />
      )}
    </>
  )
}
