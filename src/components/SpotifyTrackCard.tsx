import {
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Text,
  Box,
  Badge,
  Image,
} from '@chakra-ui/react'
import { SpotifyTrack } from '../types/tabs'

interface SpotifyTrackCardProps {
  track: SpotifyTrack
  handleClick: Function
}
export default function SpotifyTrackCard({
  track,
  handleClick,
}: SpotifyTrackCardProps): JSX.Element {
  const widthResult = useBreakpointValue({ base: '100%', md: 'sm' })
  const trackArtists = track.artists.map((elem) => elem.name)
  const trackArtistsJoined = trackArtists.join(', ')
  const minutesDuration: number = Math.floor(track.duration_ms / 60000)
  const secondsDuration: number = parseInt(
    ((track.duration_ms % 60000) / 1000).toFixed(0),
  )
  const durationFormatted: string =
    secondsDuration == 60
      ? minutesDuration + 1 + ':00'
      : minutesDuration +
        ':' +
        (secondsDuration < 10 ? '0' : '') +
        secondsDuration

  return (
    <LinkBox
      className="tab-result"
      onClick={() => {
        handleClick(track)
        console.log(track)
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
      _hover={{
        bg: `green.600`,
        color: 'white',
      }}
      transition="background-color 0.2s ease 0s"
    >
      <LinkOverlay display={'flex'}>
        <Image
          objectFit="cover"
          w={'50px'}
          h={'50px'}
          src={track.album?.images[0]?.url}
          alt="Caffe Latte"
          mr={2}
        />{' '}
        <Box>
          <Text fontSize={'lg'} as="b">
            {track.name}
          </Text>
          <br />
          {trackArtistsJoined}
        </Box>
      </LinkOverlay>
      <Box display={'flex'} alignItems={'center'} whiteSpace={'pre'} ml={2}>
        <Badge mr={2}>{durationFormatted}</Badge>
      </Box>
    </LinkBox>
  )
}
