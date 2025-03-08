import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Badge, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdFontDownload } from 'react-icons/md'
import useAppStateContext from '../hooks/useAppStateContext'

export default function FontSizeManager({ w, mt, pt }): JSX.Element {
  const { tabFontSize, setTabFontSize } = useAppStateContext()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Flex
      display={'flex'}
      fontSize={'sm'}
      alignItems={'center'}
      w={w}
      mt={mt}
      pt={pt}
    >
      <Text color={'gray.500'} as="b" mr={1}>
        {' '}
        Font size{' '}
      </Text>
      <Icon boxSize={5} as={MdFontDownload} mr={1} />
      <IconButton
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        onClick={() => setTabFontSize((prevFontSize) => prevFontSize - 10)}
        aria-label="Reduce font size"
        icon={<MinusIcon />}
      />
      <Badge mx={2} variant="subtle" fontSize={'sm'} color={'blue.400'}>
        {isClient ? tabFontSize : 100}%
      </Badge>
      <IconButton
        variant="outline"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        size={'sm'}
        boxShadow="md"
        fontWeight={'normal'}
        px="3"
        py="4"
        onClick={() => setTabFontSize((prevFontSize) => prevFontSize + 10)}
        aria-label="Increase font size"
        icon={<AddIcon />}
      />
    </Flex>
  )
}
