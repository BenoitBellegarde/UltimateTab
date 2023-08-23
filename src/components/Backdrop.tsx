import { Box } from '@chakra-ui/react'
import { MutableRefObject } from 'react'

export default function Backdrop({
  refBackdrop,
}: {
  refBackdrop: MutableRefObject<HTMLDivElement>
}): JSX.Element {
  return (
    <Box
      ref={refBackdrop}
      position={'absolute'}
      display={'none'}
      w={'100%'}
      h={'100%'}
      backdropFilter="blur(3px)"
      zIndex={1}
      bg="blackAlpha.400"
    ></Box>
  )
}
