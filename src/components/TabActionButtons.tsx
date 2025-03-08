import { Button, Flex, Icon, useBreakpointValue } from '@chakra-ui/react'
import { FaPlayCircle } from 'react-icons/fa'
import { FaCircleArrowDown } from 'react-icons/fa6'

export default function TabActionButtons({
  w,
  showBackingTrack,
  setShowBackingTrack,
  showAutoscroll,
  setShowAutoscroll,
}): JSX.Element {
  return (
    <Flex pb={1} w={w} pt={0} flexWrap={'wrap'}>
      <Button
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
          opacity: showBackingTrack ? 0.8 : 1,
        }}
        _active={{
          bg: 'fadebp',
          color: 'white',
        }}
        isActive={showBackingTrack}
        onClick={() => {
          setShowBackingTrack((prevState) => !prevState)
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        mr={2}
        mt={useBreakpointValue({ base: 3, md: 2 })}
        leftIcon={<Icon as={FaPlayCircle} />}
      >
        Backing track
      </Button>
      <Button
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
          opacity: showAutoscroll ? 0.8 : 1,
        }}
        _active={{
          bg: 'fadebp',
          color: 'white',
        }}
        isActive={showAutoscroll}
        onClick={() => {
          setShowAutoscroll((prevState) => !prevState)
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        mt={useBreakpointValue({ base: 3, md: 2 })}
        leftIcon={<Icon as={FaCircleArrowDown} />}
      >
        Autoscroll
      </Button>
    </Flex>
  )
}
