import {
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Text,
  Box,
  Badge,
  Image,
  Flex,
} from '@chakra-ui/react'

interface SpotifyPlaylistCardProps {
  playlist: Object
  handleClick: Function
}
export default function SpotifyPlaylistCard({
  playlist,
  handleClick,
}: SpotifyPlaylistCardProps): JSX.Element {
  const widthResult = useBreakpointValue({ base: '100%', md: 'sm' })
  return (
    <LinkBox
      className="tab-result"
      onClick={() => {
        handleClick(playlist.id)
        window.scrollTo(0,0)
        console.log(playlist)
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
      <LinkOverlay display={'flex'} alignItems={'center'}>
        <Image
          objectFit="cover"
          w={'50px'}
          h={'50px'}
          src={playlist?.images[0]?.url}
          alt="Caffe Latte"
          mr={2}
        />{' '}
        <Box>
          <Text fontSize={'lg'} as="b">
            {playlist?.name}
          </Text>
          <br /> {playlist?.owner.display_name}
        </Box>
      </LinkOverlay>
      <Box display={'flex'} alignItems={'center'} whiteSpace={'pre'} ml={2}>
        <Badge mr={2}>{playlist?.tracks.total} tracks</Badge>
      </Box>
    </LinkBox>
  )
}
